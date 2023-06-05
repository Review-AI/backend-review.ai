// recieve information from background script
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
      let amazonURL = window.location.href
      let asinID = amazonURL.match("(?:[/dp/]|$)([A-Z0-9]{10})")
      if(amazonURL.includes("amazon") && asinID){
        // document.body.style.overflowX = 'hidden';
        var e=document.getElementById("shopsense-container");
        if(e!==null) e.remove();
        const modal = document.createElement('div');
        modal.setAttribute("id", "shopsense-container")
        modal.setAttribute("style", "background: transparent;top: 0;right: 0;position: fixed;height:100vh;z-index:999;display:block;overflow:hidden;width:100%");
        console.log(chrome.runtime.getURL("index.html"))
        modal.innerHTML = `<object type="text/html" data="${chrome.runtime.getURL("index.html")}" style="height:100vh;width:100%;position:absolute"></object>`;
        if(!document.body){
          await window.addEventListener('DOMContentLoaded', () => {
            console.log(document.body)
            document.body.appendChild(modal);
          })
        }
        else
          document.body.appendChild(modal);
        sendResponse('Extension embedding popup')
      }
      else{
        sendResponse('Not embedding extension as it is not amazon hosted site')
      }
      
  });
  
  (async () => {
    // let background script know recieving end is loaded
    await chrome.runtime.sendMessage(true);
  })();