import './App.css';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function App() {
	const [amazonLink, setAmazonLink] = useState("");
	const [loading, setLoading] = useState(false);
	const [productDesc, setProductDesc] = useState("")
	const [clientID, setClientID] = useState("")
	const [chatQuestion, setChatQuestion] = useState("")
	const [conversation, setConversation] = useState([])

	useEffect(() => {
		setClientID(uuidv4())
	}, [])

	const fetchReviews = async () => {
		setLoading(true);
		const asinID = amazonLink.match("(?:[/dp/]|$)([A-Z0-9]{10})")
		// asinID[1]
		let res =  await axios.post("http://localhost:5000/api/v1/amazon/reviews", {"asinID": asinID[1]})
		let data = res.data.data
		console.log(data)
		let corpus = data.reviews.map(ele=> {return ele.review }).join(". ")

		let desc =  await axios.post("http://localhost:5001/predict/get_product_description", {"clientID": clientID, "reviews": corpus})
		let product_desc = desc.data
		setProductDesc(product_desc.data)
		console.log(product_desc)

		// get the description of the product
		setLoading(false)

	}

	const fetchChatAnswer = async () => {
		setLoading(true)
		let res =  await axios.post("http://localhost:5001/predict/get_chat_answer", {"clientID": clientID, "question": chatQuestion})
		let answer = res.data
		let conv = [...conversation]
		conv.push(chatQuestion)
		conv.push(answer.data)
		setConversation(conv)
		setChatQuestion("")
		setLoading(false)
	}

	return(
		<div style={{margin:"3%"}}>
			<TextField 
				id="standard-basic" 
				label="Provide Amazon Product Link" 
				variant="standard" 
				style={{width:"75%"}}
				onChange={(e)=>setAmazonLink(e.target.value)}
			/>
			<Button 
				variant="contained" 
				color="primary" 
				style={{marginLeft:"3%", marginTop:'1.5%'}}
				onClick={() => fetchReviews()}
			>
				Fetch Reviews
			</Button>
			{productDesc && 
				<div style={{"marginTop": "3%"}}>
					{productDesc}
					<TextField 
						id="standard-basic" 
						label="Ask any question related to the product" 
						variant="standard" 
						style={{width:"75%"}}
						value={chatQuestion}
						onChange={(e)=>setChatQuestion(e.target.value)}
					/>
					<Button 
						variant="contained" 
						color="primary" 
						style={{marginLeft:"3%", "marginTop": "1.5%"}}
						onClick={() => fetchChatAnswer()}
					>
						Post Question
					</Button>
					<br/>
					{conversation.map((conv, index) => (
						index % 2 === 0 ?
							<div key={index} style={{textAlign:"left", marginTop:"1%"}}><b>{conv}</b></div>
							:
							<div key={index} style={{display:"flex", justifyContent:"flex-end",alignItems:"right"}}><div style={{width:"50%"}}>{conv}</div></div>
					))}
				</div>
			}
			{loading && <LinearProgress style={{"marginTop": "3%"}}/>}
		</div>
	)
}

export default App;
