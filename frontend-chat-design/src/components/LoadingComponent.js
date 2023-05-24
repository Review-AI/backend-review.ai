import styles from "../pages/ShopSenseMain.module.css";
import LinearProgress from '@mui/material/LinearProgress';

export default function LoadingComponent(props) {
  return (
    <>
        <div className={styles.linearProgress}>
                <br/><br/><br/><br/><br/>
                <div style={{fontFamily:"DM Sans", fontSize:"24px", textAlign:"center"}}>Your shopping BFF! Chatbot to the rescue for  product queries. We'll find your perfect fit!</div>
                <br/><br/><br/><br/><br/>
                <LinearProgress sx={{ backgroundColor:'#bfc8eb', '& .MuiLinearProgress-bar': {backgroundColor:"#2a49bd"}}}/>
                <br/><br/>
                <div style={{fontFamily:"DM Sans", fontSize:"15px", textAlign:"center"}}>Hang on Tight! Setting up your personal assistant.</div>
        </div>
        <br/><br/><br/>
        <div className={styles.chatbot}>
        </div>
    </>
  );
}
