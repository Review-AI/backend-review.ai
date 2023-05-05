import { reviews as _reviews } from 'amazon-buddy';

class Amazon{
constructor() {}

static async getReviews(asinID){
    const reviews = await _reviews({ asin: asinID});
    return {"reviews": reviews.result, "total_reviews": reviews.total_reviews}
}

}

export {Amazon}