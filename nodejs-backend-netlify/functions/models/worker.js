// import { reviews as _reviews } from 'amazon-buddy';


// export default () => {
//     var url = "https://www.amazon.in/Fossil-Smartwatch-stainless-Bluetooth-calling/dp/B08FWGZB8Q/ref=sr_1_1?pf_rd_i=2563505031&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_p=22a2aad2-37a9-4d94-8d6b-c94d479eac2e&pf_rd_r=3537M7ZRZMVECT8KWQH6&pf_rd_s=merchandised-search-10&qid=1681499073&refinements=p_n_feature_fourteen_browse-bin%3A11142592031%2Cp_89%3AFossil&rnid=3837712031&s=watches&sr=1-1";
//     let amazonID = url.match("(?:[/dp/]|$)([A-Z0-9]{10})");  
//     console.log("here")
//     self.addEventListener("message", e => {// eslint-disable-line no-restricted-globals
//         console.log(e)
//       if (!e) return;
//       (async () => {
//         try {
//             // Collect 50 reviews from a product ID B01GW3H3U8
//             const reviews = await _reviews.reviews({ asin: amazonID[1]});        
//             // The postMessage() method is used for posting the given message in the console by taking the filename as fetched by workerData
//             postMessage(reviews);
    
//         } catch (error) {
//             console.log(error);
//         }
//     })();
//     });
//   };

// workerData is used for fetching the data from the thread and parentPort is used for manipulating the thread
import { workerData, parentPort } from 'worker_threads';

console.log(`Write-up on how ${workerData} wants to chill with the big boys`);

// The postMessage() method is used for posting the given message in the console by taking the filename as fetched by workerData
parentPort.postMessage({ filename: workerData, status: 'Done'});
