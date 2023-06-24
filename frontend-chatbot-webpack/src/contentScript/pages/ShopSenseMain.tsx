import React from "react";
import styles from './ShopSenseMain.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import mixpanel from 'mixpanel-browser';
import { v4 as uuidv4 } from 'uuid';
import { node_base_url, python_base_url } from '../utils/Routes';
import {ShopSenseAIIcon, ShopSenseAIManIcon, bot} from '../utils/ImagesBase64';
import { SupportedCountries } from '../utils/Amazon';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Divider } from '@mui/material';
// import bot from '../../assets/bot.png';
import JumpingDotCustom from '../components/JumpingDots/JumpingDotCustom';
import ProductDescription from '../components/ProductDescription';
import Batches from '../components/Batches';
import Header from '../components/Header';
import LoadingComponent from '../components/LoadingComponent';
import AlwaysScrollToBottom from '../components/AlwaysScrollToBottom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Tooltip from '@mui/material/Tooltip';

const ShopSenseMain = () => {
  const amazonLink =
    'https://www.amazon.com/Smartwatch-Fitness-Tracker-Pressure-Tracking/dp/B0BBQQJKF8/ref=sr_1_1_sspa?crid=3E6CY3K7I6ZRT&keywords=smartwatch&qid=1685727847&sprefix=smartwatch%2Caps%2C406&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzSkdZSDVMMUZMWkc0JmVuY3J5cHRlZElkPUEwNTA3MTM1MVc2NEJRN0g3SFA4RiZlbmNyeXB0ZWRBZElkPUEwOTMxMjg0V0Y2UzE4NFNNT1owJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==';
  const [loading, setLoading] = useState(false);
  const [changeOverviewIcon, setChangeOverviewIcon] = useState(false);
  const [expandShopSenseAI, setExpandShopSenseAI] = useState(false);
  const [productImg, setProductImg] = useState('');
  const [productName, setProductName] = useState('');
  const [productLikeness, setProductLikeness] = useState(0);
  const [productComplaint, setProductComplaint] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [productDesc, setProductDesc] = useState('');
  const [clientID, setClientID] = useState('');
  const [chatQuestion, setChatQuestion] = useState('');
  const [expandChatScreen, setExpandChatScreen] = useState(false);
  const [conversation, setConversation] = useState([
    "Hello, I'm Shopsense AI. I'm your personal product assistant 👋. How can I help you?"
  ]);
  const today = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tues',
    3: 'Wed',
    4: 'Thurs',
    5: 'Fri',
    6: 'Sat',
    7: 'Sun'
  };
  
  useEffect(() => {
    if (!clientID && !productDesc) fetchReviews();
  }, [clientID]);

  const trackAnalytics = (eventName, eventProperties) => {
    // console.log("tracking analytics")
    mixpanel.init('7f3fb18a02934a6e1e8999e94958acfb', { debug: false, track_pageview: true });
    let uniqueUserID = ''
    if(clientID)
      uniqueUserID = clientID
    else
      uniqueUserID = uuidv4();

    const eventNewProps = {...eventProperties}
    eventNewProps['clientID'] = clientID
    try{
      eventNewProps['amazonClientName'] = document.getElementById("nav-link-accountList-nav-line-1").innerHTML
    }
    catch{
      eventNewProps['amazonClientName'] = 'unknown'
    }

    mixpanel.identify(uniqueUserID)
    mixpanel.track(eventName, eventNewProps)
  }

  const fetchReviews = async () => {
    setLoading(true);
    const clientUUID = uuidv4();
    setClientID(clientUUID);
    let amazonURL = window.location.href;
    if (chrome.tabs) {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      // console.log(tab.url);
      const url = await new URL(tab.url);
      amazonURL = url.href;
      // console.log(amazonURL);
    }

    if (amazonURL.includes('localhost')) amazonURL = amazonLink;

    // console.log(amazonURL);
    const asinID = amazonURL.match('(?:[/dp/]|$)([A-Z0-9]{10})');
    // asinID[1]
    let region = 'US';
    try {
      let urlObj = new URL(amazonURL);
      // console.log(urlObj.host);
      region = Object.keys(SupportedCountries).find(
        (key) => urlObj.host === SupportedCountries[key]['host']
      );
    } catch (e) {
      console.debug(e);
    }
    let res = await axios.post(`${node_base_url}/amazon/reviews`, {
      asinID: asinID[1],
      region: region
    });
    let data = res.data.data;

    setProductImg(data.product_img);
    setTotalReviews(data.total_reviews);

    let corpus = data.reviews
      .map((ele) => {
        return ele.review;
      })
      .join('.\n ');
    let desc = await axios.post(`${python_base_url}/predict/get_product_description`, {
      clientID: clientUUID,
      reviews: corpus
    });
    let product_desc = desc.data;
    setProductDesc(product_desc.data);

    // get product name
    let short_corpus = data.reviews
      .slice(0, 20)
      .map((ele) => {
        return ele.review;
      })
      .join('.\n ');
    let product_details = await axios.post(`${python_base_url}/predict/get_product_details`, {
      product_name: data.product_nm,
      short_reviews: short_corpus
    });

    setProductName(product_details.data.data.product_name);
    setProductLikeness(product_details.data.data.product_likeness);
    setProductComplaint(product_details.data.data.product_complaints);

    // get the description of the product
    setLoading(false);
  };

  const fetchChatAnswer = async () => {
    if (!chatQuestion.trim()) return;

    // Track the question asked and send to the chatgpt
    trackAnalytics('Question Asked', {'clientQuestion': chatQuestion})

    let question = chatQuestion;
    setChatQuestion('');
    let conv = [...conversation];
    conv.push(chatQuestion);
    conv.push('...');
    setConversation(conv);
    let res = await axios.post(`${python_base_url}/predict/get_chat_answer`, {
      clientID: clientID,
      question: question
    });
    let answer = res.data.data;
    conv[conv.length - 1] = answer;
    // console.log(conv);
    setConversation((prevOutput) => [...prevOutput]);
  };
  // console.log(conversation);
  let conversationHtml = conversation.map((message, index) => {
    if (index % 2 !== 0)
      return (
        <div style={{ width: '100%', display: 'inline-block' }}>
          <div className={styles.userMessage}>{message}</div>
        </div>
      );
    else if (message === '...')
      return (
        <div style={{ display: 'flex' }}>
          <div className={styles.botIcon}>
            <img src={bot} style={{ height: '2.8vh', width: 'auto' }} />
          </div>
          <div className={styles.botMessage}>
            <JumpingDotCustom />
          </div>
        </div>
      );
    else
      return (
        <div style={{ display: 'flex' }}>
          <div className={styles.botIcon}>
            <img src={bot} style={{ height: '2.8vh', width: 'auto' }} />
          </div>
          <div className={styles.botMessage}>{message}</div>
        </div>
      );
  });

  // did not add width to 25% as we don't need it
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        width: '360px',
        right: 0,
        position: 'fixed',
        zIndex: expandShopSenseAI? 999: 0
      }}
    >
      {!expandShopSenseAI ? (
        <Tooltip title="Start your AI-powered amazon assistant!">
          {changeOverviewIcon ? (
            <img
              className={styles.showCursor}
              src={ShopSenseAIManIcon}
              style={{ position: 'fixed', top: '50%', right: 0, height: '9%', width: 'auto' }}
              onClick={() => {
                setChangeOverviewIcon(false);
                setExpandShopSenseAI(true);
                trackAnalytics('Extension Opened', {})
              }}
              onMouseEnter={() => setChangeOverviewIcon(true)}
              onMouseLeave={() => setChangeOverviewIcon(false)}
            />
          ) : (
            <img
              className={styles.showCursor}
              src={ShopSenseAIIcon}
              style={{ position: 'fixed', top: '50%', right: 0, height: '9%', width: 'auto' }}
              onClick={() => {
                setExpandShopSenseAI(true);
                trackAnalytics('Extension Opened', {})
              }}
              onMouseEnter={() => setChangeOverviewIcon(true)}
              onMouseLeave={() => setChangeOverviewIcon(false)}
            />
          )}
        </Tooltip>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: 'white',
            width: '360px',
            right: 0,
            top: 0,
            position: 'fixed'
          }}
        >
          <Header setExpandShopSenseAI={setExpandShopSenseAI} trackAnalytics={trackAnalytics} />
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <ProductDescription
                productImg={productImg}
                productDesc={productDesc}
                productName={productName}
              />
              {!expandChatScreen && (
                <Batches
                  totalReviews={totalReviews}
                  productComplaint={productComplaint}
                  productLikeness={productLikeness}
                />
              )}

              <div className={styles.chatbot}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1vh 35px'
                  }}
                >
                  <div className={styles.chatbotTitle}>Ask your Doubts</div>
                  {expandChatScreen ? (
                    <ExpandMoreIcon
                      className={styles.showCursor}
                      style={{ color: '#ffffff', fontSize: '21px' }}
                      onClick={() => setExpandChatScreen(false)}
                    />
                  ) : (
                    <ExpandLessIcon
                      className={styles.showCursor}
                      style={{ color: '#ffffff', fontSize: '21px' }}
                      onClick={() => setExpandChatScreen(true)}
                    />
                  )}
                </div>
                <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                  <Divider color={'white'} style={{ width: '93%', backgroundColor: "white" }} />
                </div>
                <div
                  style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                  }}
                >
                  <div
                    className={styles.chatWindow}
                    style={{
                      height: '80%',
                      overflowY: 'scroll',
                      position: 'absolute',
                      width: '100%'
                    }}
                  >
                    <div className={styles.chatTime}>
                      {today[new Date().getDay()]}, {moment(new Date()).format('hh:mm A')}
                    </div>
                    {conversationHtml}
                    <AlwaysScrollToBottom />
                  </div>
                  <div
                    style={{
                      height: '20%',
                      marginTop: 'auto',
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      padding: '0.3vh 0'
                    }}
                  >
                    <input
                      className={styles.chatInput}
                      placeholder={'Type a message...'}
                      value={chatQuestion}
                      onChange={(e) => {
                        if (!expandChatScreen) setExpandChatScreen(true);
                        setChatQuestion(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') fetchChatAnswer();
                      }}
                    />
                    <div className={styles.chatSubmit}>
                      <ArrowForwardIcon
                        style={{ color: 'white', fontSize: '22px' }}
                        onClick={() => {
                          fetchChatAnswer();
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopSenseMain;
