import { apply, parallelLimit } from 'async';
import { reviews as _reviews, asin as _asin } from 'amazon-buddy';

class Amazon{
constructor() {}

static async getReviews(asinID, region){
    const numThreads = 50;
    // Set up the pagination parameters
    let page = 1;
    let totalPages = 50;

    // Extract product name, product link
    const productDetails = await _asin({ asin: asinID, country: region});
    console.log(productDetails.result[0])

    // Set up the async.parallel function to fetch data from multiple pages in parallel
    const tasks = [];
    while (page <= totalPages) {
        tasks.push(apply(this.fetchPage, asinID, page, region));
        page++;
    }
    
    const results = await new Promise((resolve, reject) => {
        parallelLimit(tasks, numThreads, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    
      const aggregatedData = results.reduce((acc, curr) => acc.concat(curr), []);
      console.log(aggregatedData.length)

      return {"reviews": aggregatedData, "product_img": productDetails.result[0]["main_image"], "product_nm": productDetails.result[0]["title"], "total_reviews": productDetails.result[0]["reviews"]["total_reviews"]}
}

// Function to fetch data from a single page
static async fetchPage(asinID, pageNum, region, callback) {
    
    const reviews = await _reviews({ asin: asinID, bulk: false, page: pageNum, randomUa: true, country: region});
    
    // console.log(reviews.result)
    callback(null, reviews.result)

  }

}

export {Amazon}
