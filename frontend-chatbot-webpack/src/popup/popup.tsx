import React from "react";
import { useEffect, useState } from 'react';
import './popup.css'

const Popup = () => {
  const [showAvailDisclaimer, setShowAvailDisclaimer] = useState(false)

useEffect(() => {
  // Get the current tab URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentTab = tabs[0];
    var url = currentTab.url;

    // Use the URL as needed
    console.log(url);
    if(url && url.includes("amazon") && !url.includes("amazon.com"))
      setShowAvailDisclaimer(true)
  });

}, [])

return (
<div className="popup-div">
      <div className="popup-header">
        <img 
            className="popup-header-logo"
            alt="" 
            src="../assets/HeaderLogo.png"
        />
        <img
            className="popup-header-text"
            alt=""
            src="../assets/HeaderLogoText.png"
        />
      </div>
      <br/>
      <br/>
      <div className="display-text">
        Your shopping BFF! Chatbot to the rescue for product queiries. We'll find your perfect fit!
      </div>
      <br/>
      <br/>
      <div className="popup-amazon-button">
        <a  href = "https://www.amazon.com/" target="_blank" style={{color:"transparent"}}>
          <button className="amazon-button display-text">
            Open amazon.com
            <img src="../assets/arrow-icon.png" alt="" className="arrow-icon"/>
          </button>
        </a>
      </div>
      <br/>
      <br/>
      <div style={{display:"flex", alignItems:"center", flexDirection:"column", justifyContent:"center"}}>
        <div className="display-text popup-disclaimer">
          *This extension appears within few seconds when you land on amazon product page!
        </div>
        {showAvailDisclaimer && 
          <div className="display-text popup-disclaimer" style={{color:"red", marginTop:"5px"}}>
            *Currently the extension is available for amazon.com and soon we would be rolling out for other regions.
          </div>
        }
      </div>
      <br/>
      <br/>
      <div className="popup-email-div">
        <a href="mailto:team@shopsense.xyz" target="_blank" style={{color:"transparent"}}>
          <div className="display-text email-contact-text" >
          <img src="../assets/email-icon.png" alt="" className="email-icon" />
          team@shopsense.xyz</div>
        </a>
      </div>
      <br/>
      <br/>
      <div className="popup-contact-div">
          <img src="../assets/amazon-logo.png" alt="" className="amazon-contact-logo" />
          <img src="../assets/openai-logo.png" alt="" className="openai-contact-logo"/>
      </div>
      <br/>
    </div>
    )
};

export default Popup;