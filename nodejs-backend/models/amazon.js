import { apply, parallelLimit } from 'async';
import { reviews as _reviews } from 'amazon-buddy';

class Amazon{
constructor() {}

static async getReviews(asinID){
    const numThreads = 50;
    // Set up the pagination parameters
    let page = 1;
    let totalPages = 50;

    // Set up the async.parallel function to fetch data from multiple pages in parallel
    const tasks = [];
    while (page <= totalPages) {
        tasks.push(apply(this.fetchPage, asinID, page));
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
      return {"reviews": aggregatedData}
}

// Function to fetch data from a single page
static async fetchPage(asinID, pageNum, callback) {
    
    const reviews = await _reviews({ asin: asinID, bulk: false, page: pageNum, randomUa: true });
    
    // console.log(reviews.result)
    callback(null, reviews.result)

  }

}

export {Amazon}