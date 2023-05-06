import { Amazon } from "../models/amazon.js";
import { setAPIResponse } from "../utils.js";

const getReviews = async(req, res) => {
    const {asinID} = req.body
    try{
        let reviews = await Amazon.getReviews(asinID);
        return res.status(200).json(setAPIResponse({status: "success", data: reviews}))
    }
    catch(err){ 
        const errorMsg = "Unable to extract reviews from amazon-buddy. " + err.message
        return res.status(500).json(setAPIResponse({status: "error", error: errorMsg}))
    }
};

export {getReviews}