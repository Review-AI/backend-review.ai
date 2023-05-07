import { apply, parallelLimit } from 'async';
import { reviews as _reviews, asin } from 'amazon-buddy';
import fs from "fs";

const baseUrl = 'https://example.com/api';
const numThreads = 50;

// Set up the pagination parameters
let page = 1;
let totalPages = 50;

// Function to fetch data from a single page
async function fetchPage(pageNum, callback) {
    
  const reviews = await _reviews({ asin: "B07PXGQC1Q", bulk: false, page: pageNum, randomUa: true });
  // console.log(reviews)
  callback(null, reviews.result)
//   const url = `${baseUrl}?page=${pageNum}`;

//   request(url, (error, response, body) => {
//     if (error) {
//       return callback(error);
//     }

//     const data = JSON.parse(body);

//     // Call the callback with the data for this page
//     callback(null, data);
//   });
}

(async () => {
  const product_by_asin = await asin({ asin: 'B07PXGQC1Q' });
  console.log(product_by_asin.result[0].reviews)
  
})();
// Set up the async.parallel function to fetch data from multiple pages in parallel
const tasks = [];
while (page <= totalPages) {
  tasks.push(apply(fetchPage, page));
  page++;
}

parallelLimit(tasks, numThreads, (error, results) => {
  if (error) {
    console.error(error);
  } else {
    // Aggregate the results from all pages
    const aggregatedData = results.reduce((acc, curr) => acc.concat(curr), []);
    // console.log(aggregatedData);
    console.log(aggregatedData.length);
    fs.writeFile("fileName.json", JSON.stringify(aggregatedData), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
});
  }
});