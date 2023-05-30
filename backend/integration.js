const amazonScraper = require('amazon-buddy');

const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

var url = "https://www.amazon.in/Milton-Fiesta-Insulated-Junior-Casserole/dp/B07YLDVMPT/ref=pd_ci_mcx_mh_ci_mcx_mr_mp_m_2?pd_rd_w=PcK0J&content-id=amzn1.sym.b93afee2-0168-481c-8502-c5d075beef10&pf_rd_p=b93afee2-0168-481c-8502-c5d075beef10&pf_rd_r=J19CSMHZTFZMMQ8VMY50&pd_rd_wg=H7oJ3&pd_rd_r=8872e309-d64d-49ac-8cdd-b51075e75298&pd_rd_i=B07YLDVMPT";
//var regex = RegExp("http://www.amazon.com/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");
m = url.match("(?:[/dp/]|$)([A-Z0-9]{10})");  

(async () => {
    try {
        console.log(Date.now())
        // Collect 50 reviews from a product ID B01GW3H3U8
        const reviews = await amazonScraper.reviews({ asin: m[1]});
        const product_by_asin = await amazonScraper.asin({ asin: m[1]});
        console.log(reviews)
        
        console.log(`Number of reviews:${reviews.total_reviews}`)
        console.log(Date.now())
        await new Promise(r => setTimeout(r, 2000));
        console.log("Proceeding to extract description from chatgpt")


        let corpus = reviews.result.map(ele=> {return {"role":"user", "content":ele.review} })
        // console.log(corpus)
        corpus.push({"role":"user", "content":"Please give a description of the product from above comments in 50 words:"})
        let res = await openai.createChatCompletion({
            "model": "gpt-3.5-turbo",
            "messages": corpus,
            "temperature": 0.5
        })
        console.log(res.data.choices)
        console.log(Date.now())
        await new Promise(r => setTimeout(r, 2000));
        console.log(Date.now())
        console.log("Proceeding to extract user question from chatgpt")

        corpus = reviews.result.map(ele=> {return {"role":"user", "content":ele.review} })
        corpus.push({"role":"user", "content":"Does this bottle leak? Analyze the reviews provided above and also give which review talks about this issue."})
        res = await openai.createChatCompletion({
            "model": "gpt-3.5-turbo",
            "messages": corpus,
            "temperature": 0.5
        })
        console.log(res.data.choices)



    } catch (error) {
        console.log(error);
    }
})();