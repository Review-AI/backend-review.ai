import styles from "./ShopSenseMain.module.css";
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgressCustom from "../components/CircularProgressCustom"
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {node_base_url, python_base_url} from '../utils/Routes'

const ShopSenseMain = () => {
  const [amazonLink, setAmazonLink] = useState("https://www.amazon.in/Fossil-Smartwatch-stainless-Bluetooth-calling/dp/B08FWGZB8Q/ref=sr_1_1?pf_rd_i=2563505031&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_p=22a2aad2-37a9-4d94-8d6b-c94d479eac2e&pf_rd_r=3537M7ZRZMVECT8KWQH6&pf_rd_s=merchandised-search-10&qid=1681499073&refinements=p_n_feature_fourteen_browse-bin%3A11142592031%2Cp_89%3AFossil&rnid=3837712031&s=watches&sr=1-1");
	const [loading, setLoading] = useState(false);
  const [productImg, setProductImg] = useState("");
  const [totalReviews, setTotalReviews] = useState(0)
	const [productDesc, setProductDesc] = useState("")
	const [clientID, setClientID] = useState("")
	const [chatQuestion, setChatQuestion] = useState("")
	const [conversation, setConversation] = useState([])

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
    setTotalReviews(data.total)

		let corpus = data.reviews.map(ele=> {return ele.review }).join(".\n ")
		let desc =  await axios.post(`${python_base_url}/predict/get_product_description`, {"clientID": clientID, "reviews": corpus})
		let product_desc = desc.data
		setProductDesc(product_desc.data)
		console.log(product_desc)

		// get the description of the product
		setLoading(false)

	}

	const fetchChatAnswer = async () => {
		setLoading(true)
		let res =  await axios.post(`${python_base_url}/predict/get_chat_answer`, {"clientID": clientID, "question": chatQuestion})
		let answer = res.data
		let conv = [...conversation]
		conv.push(chatQuestion)
		conv.push(answer.data)
		setConversation(conv)
		setChatQuestion("")
		setLoading(false)
	}

  return (
    <>
    <div className={styles.iphone1420Item} >
    <img className={styles.image23Icon} alt="" src="/image-23@2x.png" />
    <img
        className={styles.screenshot20230511At103}
        alt=""
        src="/screenshot-20230511-at-103-1@2x.png"
      />
      <img className={styles.image13Icon} alt="" src="/image-13@2x.png" />
      </div>
    <div className={styles.iphone1420}>
      <img className={styles.iphone1420Child} alt="" src="/rectangle-172.svg" />
      <div className={styles.summaryBestSellingContainer}>
        <p className={styles.summary}>
          <b>Summary:</b>
        </p>
        <p className={styles.bestSellingBottles}>
          {productDesc}
        </p>
      </div>
      <div className={styles.catchyPhraseToIntroduceWrapper}>
        <div
          className={styles.catchyPhraseTo}
        >{`Catchy Phrase to introduce `}</div>
      </div>
      <div className={styles.iphone1420Inner} />
      <div className={styles.input}>
        <div className={styles.typeAMessage}>Type a message...</div>
      </div>
      <div className={styles.div}>
        <div className={styles.messageFromBot}>
          <div className={styles.wed821Am}>Wed 8:21 AM</div>
        </div>
        <div className={styles.message}>
          <img className={styles.messageChild} alt="" src="/frame-2107.svg" />
          <div className={styles.textBox}>
            <div className={styles.helloImReview}>
              Hello, I’m Review AI 👋 I’m your personal product assistant. How
              can I help you?
            </div>
          </div>
        </div>
        <div className={styles.message1}>
          <img className={styles.messageChild} alt="" src="/frame-2107.svg" />
          <div className={styles.textBox}>
            <div className={styles.helloImReview}>
              Yes, it is leak proof. I’m your personal product assistant. How
              can I help you?
            </div>
          </div>
        </div>
        <div className={styles.myMessage}>
          <div className={styles.isThisBottle}>Is this bottle leak proof ?</div>
        </div>
        <div className={styles.askYourDoubts}>Ask your Doubts</div>
        <div className={styles.child} />
      </div>
      <img className={styles.ellipseIcon} alt="" src="/ellipse-49.svg" />
      <img className={styles.groupIcon} alt="" src="/group-21.svg" />
      <img className={styles.iphone1420Child1} alt="" src="/ellipse-103.svg" />
      <img
        className={styles.a7vnwpatl1Icon}
        alt=""
        src="/51a7vnwpatl-1@2x.png"
      />
      <b className={styles.totalReviews}>Total Reviews</b>
      <b className={styles.likedTheProduct}>Liked the product</b>
      <b className={styles.productComplaints}>Product Complaints</b>
      <img className={styles.type1Icon} alt="" src="/type-1.svg" />
      <CircularProgressCustom />
      {/* <div className={styles.type2}>
        <img className={styles.backgroundIcon} alt="" src="/background.svg" />
        <img className={styles.backgroundIcon} alt="" src="/front.svg" />
        <div className={styles.div1}>25.0%</div>
        <div className={styles.k}>10k</div>
        <img className={styles.backgroundIcon} alt="" src="/background.svg" />
      </div> */}
      {/* <div className={styles.type3}>
        <img className={styles.backgroundIcon2} alt="" src="/background1.svg" />
        <img className={styles.backgroundIcon2} alt="" src="/front1.svg" />
        <div className={styles.div2}>40%</div>
      </div> */}
      <div className={styles.borosilBottle}>Borosil Bottle</div>
    </div>
    </>
  );
};

export default ShopSenseMain;
