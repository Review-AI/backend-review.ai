// var amazon=require("amazon-product-reviews-scraper");

// amazon.open("https://www.amazon.in/Fossil-Smartwatch-stainless-Bluetooth-calling/dp/B08FWWKGBZ/ref=pd_ci_mcx_mh_mcx_views_0?pd_rd_w=GxJ1U&content-id=amzn1.sym.7938e11a-362b-421f-bd30-8dd8d3c4b65f&pf_rd_p=7938e11a-362b-421f-bd30-8dd8d3c4b65f&pf_rd_r=RXHMBB57WVTGMWDJTP96&pd_rd_wg=EuqFi&pd_rd_r=78b3a089-f878-4fc0-bd5f-648fca5e6040&pd_rd_i=B08FWGZB8Q&th=1")

// amazon.get_reviews()

var amazon=require("amazon-product-reviews-scraper");

function print_data(response){
	var data=response["body"]
	console.log("reviews data",data)
}
function get_data(){
	amazon.get_reviews(print_data)
}
amazon.open("https://www.amazon.in/Fossil-Smartwatch-stainless-Bluetooth-calling/dp/B08FWWKGBZ/ref=pd_ci_mcx_mh_mcx_views_0?pd_rd_w=GxJ1U&content-id=amzn1.sym.7938e11a-362b-421f-bd30-8dd8d3c4b65f&pf_rd_p=7938e11a-362b-421f-bd30-8dd8d3c4b65f&pf_rd_r=RXHMBB57WVTGMWDJTP96&pd_rd_wg=EuqFi&pd_rd_r=78b3a089-f878-4fc0-bd5f-648fca5e6040&pd_rd_i=B08FWGZB8Q&th=1",get_data)
