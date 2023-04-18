const amazonScraper = require('amazon-buddy');

const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

var url = "https://www.amazon.com/Razer-BlackWidow-Mechanical-Gaming-Keyboard/dp/B0BV4BC7LV/ref=sr_1_1_sspa?keywords=gaming%2Bkeyboard&pd_rd_r=b7d4e789-c743-4f84-b46c-def42e9c4db6&pd_rd_w=rEjrw&pd_rd_wg=O3TTt&pf_rd_p=12129333-2117-4490-9c17-6d31baf0582a&pf_rd_r=WYKXXVWZS5RTK34A42V3&qid=1681576171&sr=8-1-spons&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFSOVFGMTY5RktROEQmZW5jcnlwdGVkSWQ9QTAyNjU0NjQzN1dBWTQyT1lTSUNJJmVuY3J5cHRlZEFkSWQ9QTAwNzgyMjUyRDBFVzc1NTcwWFZYJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm9";
//var regex = RegExp("http://www.amazon.com/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");
m = url.match("(?:[/dp/]|$)([A-Z0-9]{10})");  

(async () => {
    try {
        console.log(Date.now())
        // Collect 50 reviews from a product ID B01GW3H3U8
        const reviews = await amazonScraper.reviews({ asin: m[1]});
        const product_by_asin = await amazonScraper.asin({ asin: m[1]});
        
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