// recieve information from background script
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log('from background script: ' + message )
    // window.addEventListener('DOMContentLoaded', () => {
      var e=document.getElementById("headlineFetcher");
      console.log(e)
      if(e!==null) e.remove();
      const modal = document.createElement('div');
      modal.setAttribute("id", "headlineFetcher")
      modal.setAttribute("style", "background: white;top: 0;right: 0;position: fixed;height:100vh;z-index:999;display:block;width:483px");
      console.log(chrome.runtime.getURL("index.html"))
      modal.innerHTML = `<object type="text/html" data="${chrome.runtime.getURL("index.html")}" style="width:483px;height:100vh"></object>`;
      if(!document.body){
        await window.addEventListener('DOMContentLoaded', () => {
          console.log(document.body)
          document.body.appendChild(modal);
        })
      }
      else
        document.body.appendChild(modal);
      // });
   
      // modal.innerHTML = `<iframe id="headlineFetcher"style="height:100%"></iframe>
      //     <div style="position:absolute; top:0px; left:5px;">  
      //         <button>x</button>
      //     </div>`;
      
      // const dialog = document.querySelector("dialog");
      // dialog.showModal();
      // const iframe = document.getElementById("headlineFetcher");  
      // iframe.src = chrome.runtime.getURL("index.html");
      // iframe.frameBorder = 0;
      // dialog.querySelector("button").addEventListener("click", () => {
      //     dialog.close();
      //  });
    sendResponse('message recieved')
  });
  
  (async () => {
    // let background script know recieving end is loaded
    await chrome.runtime.sendMessage(true);
  })();