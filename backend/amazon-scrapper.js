const amazonScraper = require('amazon-buddy');

// using https://www.npmjs.com/package/amazon-buddy

var url = "https://www.amazon.in/Fossil-Smartwatch-stainless-Bluetooth-calling/dp/B08FWGZB8Q/ref=sr_1_1?pf_rd_i=2563505031&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_p=22a2aad2-37a9-4d94-8d6b-c94d479eac2e&pf_rd_r=3537M7ZRZMVECT8KWQH6&pf_rd_s=merchandised-search-10&qid=1681499073&refinements=p_n_feature_fourteen_browse-bin%3A11142592031%2Cp_89%3AFossil&rnid=3837712031&s=watches&sr=1-1";
var regex = RegExp("http://www.amazon.com/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");
m = url.match("(?:[/dp/]|$)([A-Z0-9]{10})");  

(async () => {
    try {
        // Collect 50 reviews from a product ID B01GW3H3U8
        const reviews = await amazonScraper.reviews({ asin: m[1]});
        const product_by_asin = await amazonScraper.asin({ asin: m[1]});
    
        console.log(reviews)
        console.log(product_by_asin)
    } catch (error) {
        console.log(error);
    }
})();