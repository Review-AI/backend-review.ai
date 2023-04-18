//https://davidlozzi.com/2023/03/06/getting-started-with-chatgpt-apis-with-nodejs/
const amazonScraper = require('amazon-buddy');

const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

var url = "https://www.amazon.in/Fossil-Smartwatch-stainless-Bluetooth-calling/dp/B08FWGZB8Q/ref=sr_1_1?pf_rd_i=2563505031&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_p=22a2aad2-37a9-4d94-8d6b-c94d479eac2e&pf_rd_r=3537M7ZRZMVECT8KWQH6&pf_rd_s=merchandised-search-10&qid=1681499073&refinements=p_n_feature_fourteen_browse-bin%3A11142592031%2Cp_89%3AFossil&rnid=3837712031&s=watches&sr=1-1";
var regex = RegExp("http://www.amazon.com/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");
m = url.match("(?:[/dp/]|$)([A-Z0-9]{10})");  

(async () => {
    try {
        // Collect 50 reviews from a product ID B01GW3H3U8
        const reviews = await amazonScraper.reviews({ asin: m[1]});
        const product_by_asin = await amazonScraper.asin({ asin: m[1]});
    
        // console.log(reviews)
        
        let corpus = reviews.result.map(ele=> {return {"role":"user", "content":ele.review} })
        
        let messages = reviews.result.map(ele=> {return ele.review }).join(". ")
        // console.log(corpus)
        // console.log(messages)
        messages+=".\nPlease give a description of the product from the comments in 50 words:";
        let res = await openai.createCompletion({
            "model": "text-davinci-002",
            "prompt": messages,
            "temperature": 0.5
        })
        console.log(res.data.choices)

        



    } catch (error) {
        console.log(error);
    }
})();