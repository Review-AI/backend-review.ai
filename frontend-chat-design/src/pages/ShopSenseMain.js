import styles from "./ShopSenseMain.module.css";
import { useEffect, useState } from 'react';
import CircularProgressCustom from "../components/CircularProgressCustom"
import axios from 'axios';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {node_base_url, python_base_url} from '../utils/Routes'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Divider} from "@mui/material";
import bot from '../assets/bot.png'
import MenuItemCustom from "../components/MenuItemCustom"
import JumpingDotCustom from "../components/JumpingDots/JumpingDotCustom";

const ShopSenseMain = () => {
  const [amazonLink, setAmazonLink] = useState("https://www.amazon.in/Fossil-Smartwatch-stainless-Bluetooth-calling/dp/B08FWGZB8Q/ref=sr_1_1?pf_rd_i=2563505031&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_p=22a2aad2-37a9-4d94-8d6b-c94d479eac2e&pf_rd_r=3537M7ZRZMVECT8KWQH6&pf_rd_s=merchandised-search-10&qid=1681499073&refinements=p_n_feature_fourteen_browse-bin%3A11142592031%2Cp_89%3AFossil&rnid=3837712031&s=watches&sr=1-1");
	const [loading, setLoading] = useState(false);
  const [productImg, setProductImg] = useState("");
  const [totalReviews, setTotalReviews] = useState(0)
	const [productDesc, setProductDesc] = useState("")
	const [clientID, setClientID] = useState("")
	const [chatQuestion, setChatQuestion] = useState("")
	const [conversation, setConversation] = useState([])

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
    <div style={{display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden"}}>
        <div className={styles.iphone1420Item} >
            <img className={styles.image23Icon} alt="" src="/image-23@2x.png"/>
            <img
                className={styles.screenshot20230511At103}
                alt=""
                src="/screenshot-20230511-at-103-1@2x.png"
              />
            <MenuItemCustom />
            {/*<img className={styles.image13Icon} alt="" src="/image-13@2x.png" />*/}
        </div>
        <div style={{width: "475px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"15px 5px"}}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <div className={styles.circledImg}>
                    <img
                        className={styles.a7vnwpatl1Icon}
                        alt=""
                        src="/51a7vnwpatl-1@2x.png"
                    />
                </div>
                <div className={styles.productName}>Borosil Bottle</div>
            </div>
            <div className={styles.summaryBestSellingContainer}>
                <p className={styles.summary}>
                  <b>Summary:</b>
                </p>
                <p className={styles.bestSellingBottles}>
                  {/*{productDesc}*/}
                    INSULATED SPORTS WATER BOTTLE: Goodbye sweat! The double wall insulation makes the Iron Flask sweat-free! It keeps your drink COLD for up to 24 hours, and HOT for up to 12 hours. *NOTE: ONLY the 14 Oz, 18 Oz, & 22 Oz fit in cupholders* 3 LIDS: YES, Iron Flask comes with THREE different 100% LEAK PROOF lids. Carabiner Straw Lid with 2 Straws, Flip Lid, and a Stainless Steel Lid!
                </p>
            </div>
        </div>

        <div style={{display:"flex" , width: "483px", justifyContent:"space-evenly"}}>
            <div style={{display:"flex", flexDirection:"column"}}>
                <CircularProgressCustom />
                <span className={styles.batch}>Total Reviews</span>
            </div>
             <div style={{display:"flex", flexDirection:"column"}}>
                <CircularProgressCustom />
                <span className={styles.batch}>Total Reviews</span>
            </div>
             <div style={{display:"flex", flexDirection:"column"}}>
                <CircularProgressCustom />
                <span className={styles.batch}>Total Reviews</span>
            </div>
        </div>
        <div className={styles.chatbot}>
            <div className={styles.chatbotTitle}>Ask your Doubts</div>
            <Divider color={"white"} style={{margin:"5px 10px"}}/>
            <div style={{flexGrow:1, display:"flex", flexDirection:"column", position: "relative"}}>
                <div style={{height:"80%", overflow: "scroll", position: "absolute", width:"100%"}}>
                    <div className={styles.chatTime}>{today[new Date().getDay()]}, {moment(new Date()).format("hh:mm A")}</div>
                    <div style={{display: "flex"}}>
                        <div className={styles.botIcon}><img src={bot} style={{height:"21px", width:"auto"}}/></div>
                        <div className={styles.botMessage}>
                            Hello, I'm Review AI. I'm your personal product assistant 👋. How can I help you?
                        </div>
                    </div>
                    <br/>
                    <div className={styles.userMessage}>Is this bottle leak proof?</div><br/><br/>
                    <div style={{display: "flex"}}>
                        <div className={styles.botIcon}><img src={bot} style={{height:"21px", width:"auto"}}/></div>
                        <div className={styles.botMessage}>
                            <JumpingDotCustom />
                        </div>
                        {/*<div className={styles.botMessage}>*/}
                        {/*    Yes, it is leak proof*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div style={{height:"20%", marginTop:"auto", display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
                    <input className={styles.chatInput} placeholder={"Type a message..."}/>
                    <div className={styles.chatSubmit}><ArrowForwardIcon style={{color: "white"}}/></div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ShopSenseMain;
