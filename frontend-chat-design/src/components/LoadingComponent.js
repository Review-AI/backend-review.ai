import styles from "../pages/ShopSenseMain.module.css";
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingComponent(props) {
  return (
    <>
        <div className={styles.linearProgress}>
                <div style={{fontFamily:"DM Sans", fontSize:"3vh", textAlign:"center", marginTop:"10vh"}}>Your shopping BFF! Chatbot to the rescue for  product queries. We'll find your perfect fit!</div>
                <LinearProgress sx={{ backgroundColor:'#bfc8eb', '& .MuiLinearProgress-bar': {backgroundColor:"#2a49bd"}}} style={{marginTop:"10vh"}} />
                <div style={{fontFamily:"DM Sans", fontSize:"2.2vh", textAlign:"center", marginTop:"4vh"}}>Hang on Tight! Setting up your personal assistant.</div>
        </div>
        <div className={styles.chatbot} style={{marginTop:"6vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <CircularProgress style={{color:"white"}} size="1.5rem"/><br/>
        <div style={{fontFamily:"DM Sans", fontSize:"1.6vh", textAlign:"center", color:"white"}}>Please Wait!</div>
        </div>
    </>
  );
}
