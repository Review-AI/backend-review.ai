import styles from "./ShopSenseMain.module.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {node_base_url, python_base_url} from '../utils/Routes'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Divider} from "@mui/material";
import bot from '../assets/bot.png'
import JumpingDotCustom from "../components/JumpingDots/JumpingDotCustom";
import ProductDescription from "../components/ProductDescription";
import Batches from "../components/Batches";
import Header from "../components/Header";
import AlwaysScrollToBottom from "../components/AlwaysScrollToBottom"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const ShopSenseMain = () => {
  const [amazonLink, setAmazonLink] = useState("https://www.amazon.in/Fossil-Smartwatch-stainless-Bluetooth-calling/dp/B08FWGZB8Q/ref=sr_1_1?pf_rd_i=2563505031&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_p=22a2aad2-37a9-4d94-8d6b-c94d479eac2e&pf_rd_r=3537M7ZRZMVECT8KWQH6&pf_rd_s=merchandised-search-10&qid=1681499073&refinements=p_n_feature_fourteen_browse-bin%3A11142592031%2Cp_89%3AFossil&rnid=3837712031&s=watches&sr=1-1");
	const [loading, setLoading] = useState(false);
  const [productImg, setProductImg] = useState("");
  const [productName, setProductName] = useState("");
  const [productLikeness, setProductLikeness] = useState(0)
  const [productComplaint, setProductComplaint] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
	const [productDesc, setProductDesc] = useState("")
	const [clientID, setClientID] = useState("")
	const [chatQuestion, setChatQuestion] = useState("")
  const [expandChatScreen, setExpandChatScreen] = useState(false)
	const [conversation, setConversation] = useState(["Hello, I'm Review AI. I'm your personal product assistant 👋. How can I help you?"])
    const today = {
      0: "Sun",
      1: "Mon",
      2: "Tues",
      3: "Wed",
      4: "Thurs",
      5: "Fri",
      6: "Sat",
      7: "Sun",
    }

	useEffect(() => {
		setClientID(uuidv4())
	}, [])

  useEffect(() => {
    if(clientID && !productDesc)
      fetchReviews()
  }, [clientID])

	const fetchReviews = async () => {
		setLoading(true);
		const asinID = amazonLink.match("(?:[/dp/]|$)([A-Z0-9]{10})")
		// asinID[1]
		let res =  await axios.post(`${node_base_url}/api/v1/amazon/reviews`, {"asinID": asinID[1]})
		let data = res.data.data
		console.log(data)

    setProductImg(data.product_img)
    setTotalReviews(data.total_reviews)

		let corpus = data.reviews.map(ele=> {return ele.review }).join(".\n ")
		let desc =  await axios.post(`${python_base_url}/predict/get_product_description`, {"clientID": clientID, "reviews": corpus})
		let product_desc = desc.data
		setProductDesc(product_desc.data)
		console.log(product_desc)

		// get product name
    let short_corpus = data.reviews.slice(0, 20).map(ele=> {return ele.review }).join(".\n ")
    let product_details =  await axios.post(`${python_base_url}/predict/get_product_details`, {"product_name": data.product_nm, "short_reviews": short_corpus})
		
    console.log(product_details)
    setProductName(product_details.data.data.product_name)
    setProductLikeness(product_details.data.data.product_likeness)
    setProductComplaint(product_details.data.data.product_complaints)

    // get the description of the product
		setLoading(false)

	}

	const fetchChatAnswer = async () => {
    if(!chatQuestion.trim())
      return
    let question = chatQuestion
    setChatQuestion("")
    let conv = [...conversation]
    conv.push(chatQuestion)
    conv.push("...")
    setConversation(conv)
		let res =  await axios.post(`${python_base_url}/predict/get_chat_answer`, {"clientID": clientID, "question": question})
		let answer = res.data.data
    conv[conv.length - 1] = answer
    console.log(conv)
		setConversation(prevOutput => [...prevOutput])
	}
  console.log(conversation)
  let conversationHtml = conversation.map((message, index) => {
    if(index%2!==0)
    return(
      <div style={{width:"100%", display:"inline-block"}}><div className={styles.userMessage}>{message}</div></div>
    )
    else if(message === '...')
    return(
      <div style={{display: "flex"}}>
      <div className={styles.botIcon}><img src={bot} style={{height:"21px", width:"auto"}}/></div>
      <div className={styles.botMessage}>
          <JumpingDotCustom />
      </div>
  </div>
    )
    else
    return(
      <div style={{display: "flex"}}>
                        <div className={styles.botIcon}><img src={bot} style={{height:"21px", width:"auto"}}/></div>
                        <div className={styles.botMessage}>
                          {message}
                        </div>
                    </div>
    )
  });
  return (
    <div style={{display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden"}}>
        <Header />
        <ProductDescription productImg={productImg} productDesc={productDesc} productName={productName}/>
        {!expandChatScreen && <Batches totalReviews={totalReviews} productComplaint={productComplaint} productLikeness={productLikeness}/>}
        
        <div className={styles.chatbot}>
            <div style={{display:"flex", alignItems: "flex-end", justifyContent: "space-between"}}>
              <div className={styles.chatbotTitle}>Ask your Doubts</div>
              {
                expandChatScreen?
                  <ExpandMoreIcon 
                    className={styles.showCursor} 
                    style={{color: "#ffffff", marginRight:"30px", fontSize:"27px"}}
                    onClick={()=>setExpandChatScreen(false)}
                  />
                  :
                  <ExpandLessIcon 
                    className={styles.showCursor} 
                    style={{color: "#ffffff", marginRight:"30px", fontSize:"27px"}}
                    onClick={()=>setExpandChatScreen(true)}
                  />

              }
            </div>
            <Divider color={"white"} style={{margin:"5px 10px"}}/>
            <div style={{flexGrow:1, display:"flex", flexDirection:"column", position: "relative"}}>
                <div className={styles.chatWindow} style={{height:"80%", overflowY: "scroll", position: "absolute", width:"100%"}}>
                    <div className={styles.chatTime}>{today[new Date().getDay()]}, {moment(new Date()).format("hh:mm A")}</div>
                    {conversationHtml}
                    <AlwaysScrollToBottom />
                </div>
                <div style={{height:"20%", marginTop:"auto", display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
                    <input 
                      className={styles.chatInput} 
                      placeholder={"Type a message..."} 
                      value={chatQuestion} 
                      onChange={(e) => {
                        if(!expandChatScreen)
                          setExpandChatScreen(true)
                        setChatQuestion(e.target.value)
                      }
                      }
                    />
                    <div className={styles.chatSubmit}>
                      <ArrowForwardIcon style={{color: "white"}} onClick={()=>{
                        fetchChatAnswer()
                      }
                        }/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ShopSenseMain;
