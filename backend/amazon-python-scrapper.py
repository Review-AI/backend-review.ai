# References :
# https://www.geeksforgeeks.org/web-scraping-amazon-customer-reviews/
import requests
from bs4 import BeautifulSoup

def cus_rev(soup):
    # find the Html tag
    # with find()
    # and convert into string
    data_str = ""
  
    for item in soup.find_all("div", class_="a-expander-content \
    reviewText review-text-content a-expander-partial-collapse-content"):
        data_str = data_str + item.get_text()
  
    result = data_str.split("\n")
    return (result)

# Send a GET request to the URL and get the page content
response = requests.get("https://www.amazon.in/dp/B08HWFWGNX/ref=s9_acsd_al_bw_c2_x_0_i?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-11&pf_rd_r=6TYDB31XK8D4V2KDFX8Y&pf_rd_t=101&pf_rd_p=24f6b357-8b3b-41d6-81f8-50309f425808&pf_rd_i=1983338031")

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.content, "html.parser")
#print(soup)

# Get the product title
title = soup.find("span", {"id": "productTitle"}).get_text().strip()

# Get the product price
price = soup.find("span", {"class": "a-price-whole"}).get_text().strip()

# Get the product rating
rating = soup.find("span", {"class": "a-icon-alt"}).get_text().strip()

# Print the scraped data
print("Product title:", title)
print("Product price:", price)
print("Product rating:", rating)

rev_data = cus_rev(soup)
rev_result = []
for i in rev_data:
    if i == "":
        pass
    else:
        rev_result.append(i)
print(rev_result)
