from langchain.document_loaders import UnstructuredFileLoader
from langchain.chains.summarize import load_summarize_chain
from langchain.chains.question_answering import load_qa_chain
import re
from langchain.text_splitter import CharacterTextSplitter
from langchain.docstore.document import Document
from langchain import OpenAI

#sm_loader = UnstructuredFileLoader("./data/muir_lake_tahoe_in_winter.txt")
#sm_doc = sm_loader.load()

reviews = """
The first time I purchased a double wall SS water bottle, I went for the expensive name brand but ever since I discovered 
these ones 3 years ago... never again! At a quarter or so of the price of the name brand it it EXACTLY the SAME quality! I can put ice in these, water, and leave in the car with the windows up on a 90* day and come back 8+ hours later from the 
theme park and BOOM! STILL HAS ICE IN IT! Ya'll know how hot cars get in the summer with the windows up... The color choices are amazing, the size options are there, and you get multiple lid options in one box. YES, PLEASE! I have purchased many of these for myself and as gifts and I will continue to because they are quality without breaking the bank!. I forgot to dump my ice out when I came home one night and it was still there in the morning! Keeps drinks really cold and doesn’t spill (if the lid is closed all the way. It will leak if not tightened properly or if the “straw” is up and tips over). Very pleased with my purchase!. this is a great water bottle. my husband loves it. only sad thing is he dropped it once and the lid that comes up w a straw broke but it still works bc you get a second screw cap lid ! perfect size for everyday use. 
I use this hydro for cold water when I go to work or work out. It definitely keeps my water cold all day. It comes with two straws and another kind of top. I love the color, super vibrant. Definitely would recommend because it serves purpose of insulating but not for ridiculous price.. I use this every day for my hot tea at work. I take it from home to work and it keeps my tea hot so I would bet it also keeps drinks cold. It's sturdy AF and comes with a flat lid as well as a lid with a straw. It never leaks or spills. I got the size I thought I needed and it was perfect.. It will hold ice ALL day, love 
using it. Awesome water bottle. I bought the 64oz green/ teal and it’s the best water bottle. It’s sturdy and doesn’t leak. I even bought the silicone thing that goes on the bottom to protect your bottle and the surfaces your put it on.Outstanding design!. Really enjoy the color, size, and sport mouth piece! Bummer though that on my second day it fell, got a dent, and now I’m guessing the middle liner busted and now rattles.. We have a few of these Hydro cell water bottles. My son noticed the little clear stopper thing was missing from his lid and thus leaking. I messaged them directly and they sent a replacement lid immediately no questions asked. Can't ask for better customer service! Highly recommend!. Good
The first time I purchased a double wall SS water bottle, I went for the expensive name brand but ever since I discovered 
these ones 3 years ago... never again! At a quarter or so of the price of the name brand it it EXACTLY the SAME quality! I can put ice in these, water, and leave in the car with the windows up on a 90* day and come back 8+ hours later from the 
theme park and BOOM! STILL HAS ICE IN IT! Ya'll know how hot cars get in the summer with the windows up... The color choices are amazing, the size options are there, and you get multiple lid options in one box. YES, PLEASE! I have purchased many of these for myself and as gifts and I will continue to because they are quality without breaking the bank!. I forgot to dump my ice out when I came home one night and it was still there in the morning! Keeps drinks really cold and doesn’t spill (if the lid is closed all the way. It will leak if not tightened properly or if the “straw” is up and tips over). Very pleased with my purchase!. this is a great water bottle. my husband loves it. only sad thing is he dropped it once and the lid that comes up w a straw broke but it still works bc you get a second screw cap lid ! perfect size for everyday use. 
I use this hydro for cold water when I go to work or work out. It definitely keeps my water cold all day. It comes with two straws and another kind of top. I love the color, super vibrant. Definitely would recommend because it serves purpose of insulating but not for ridiculous price.. I use this every day for my hot tea at work. I take it from home to work and it keeps my tea hot so I would bet it also keeps drinks cold. It's sturdy AF and comes with a flat lid as well as a lid with a straw. It never leaks or spills. I got the size I thought I needed and it was perfect.. It will hold ice ALL day, love 
using it. Awesome water bottle. I bought the 64oz green/ teal and it’s the best water bottle. It’s sturdy and doesn’t leak. I even bought the silicone thing that goes on the bottom to protect your bottle and the surfaces your put it on.Outstanding design!. Really enjoy the color, size, and sport mouth piece! Bummer though that on my second day it fell, got a dent, and now I’m guessing the middle liner busted and now rattles.. We have a few of these Hydro cell water bottles. My son noticed the little clear stopper thing was missing from his lid and thus leaking. I messaged them directly and they sent a replacement lid immediately no questions asked. Can't ask for better customer service! Highly recommend!. Good
The first time I purchased a double wall SS water bottle, I went for the expensive name brand but ever since I discovered 
these ones 3 years ago... never again! At a quarter or so of the price of the name brand it it EXACTLY the SAME quality! I can put ice in these, water, and leave in the car with the windows up on a 90* day and come back 8+ hours later from the 
theme park and BOOM! STILL HAS ICE IN IT! Ya'll know how hot cars get in the summer with the windows up... The color choices are amazing, the size options are there, and you get multiple lid options in one box. YES, PLEASE! I have purchased many of these for myself and as gifts and I will continue to because they are quality without breaking the bank!. I forgot to dump my ice out when I came home one night and it was still there in the morning! Keeps drinks really cold and doesn’t spill (if the lid is closed all the way. It will leak if not tightened properly or if the “straw” is up and tips over). Very pleased with my purchase!. this is a great water bottle. my husband loves it. only sad thing is he dropped it once and the lid that comes up w a straw broke but it still works bc you get a second screw cap lid ! perfect size for everyday use. 
I use this hydro for cold water when I go to work or work out. It definitely keeps my water cold all day. It comes with two straws and another kind of top. I love the color, super vibrant. Definitely would recommend because it serves purpose of insulating but not for ridiculous price.. I use this every day for my hot tea at work. I take it from home to work and it keeps my tea hot so I would bet it also keeps drinks cold. It's sturdy AF and comes with a flat lid as well as a lid with a straw. It never leaks or spills. I got the size I thought I needed and it was perfect.. It will hold ice ALL day, love 
using it. Awesome water bottle. I bought the 64oz green/ teal and it’s the best water bottle. It’s sturdy and doesn’t leak. I even bought the silicone thing that goes on the bottom to protect your bottle and the surfaces your put it on.Outstanding design!. Really enjoy the color, size, and sport mouth piece! Bummer though that on my second day it fell, got a dent, and now I’m guessing the middle liner busted and now rattles.. We have a few of these Hydro cell water bottles. My son noticed the little clear stopper thing was missing from his lid and thus leaking. I messaged them directly and they sent a replacement lid immediately no questions asked. Can't ask for better customer service! Highly recommend!. Good
The first time I purchased a double wall SS water bottle, I went for the expensive name brand but ever since I discovered 
these ones 3 years ago... never again! At a quarter or so of the price of the name brand it it EXACTLY the SAME quality! I can put ice in these, water, and leave in the car with the windows up on a 90* day and come back 8+ hours later from the 
theme park and BOOM! STILL HAS ICE IN IT! Ya'll know how hot cars get in the summer with the windows up... The color choices are amazing, the size options are there, and you get multiple lid options in one box. YES, PLEASE! I have purchased many of these for myself and as gifts and I will continue to because they are quality without breaking the bank!. I forgot to dump my ice out when I came home one night and it was still there in the morning! Keeps drinks really cold and doesn’t spill (if the lid is closed all the way. It will leak if not tightened properly or if the “straw” is up and tips over). Very pleased with my purchase!. this is a great water bottle. my husband loves it. only sad thing is he dropped it once and the lid that comes up w a straw broke but it still works bc you get a second screw cap lid ! perfect size for everyday use. 
I use this hydro for cold water when I go to work or work out. It definitely keeps my water cold all day. It comes with two straws and another kind of top. I love the color, super vibrant. Definitely would recommend because it serves purpose of insulating but not for ridiculous price.. I use this every day for my hot tea at work. I take it from home to work and it keeps my tea hot so I would bet it also keeps drinks cold. It's sturdy AF and comes with a flat lid as well as a lid with a straw. It never leaks or spills. I got the size I thought I needed and it was perfect.. It will hold ice ALL day, love 
using it. Awesome water bottle. I bought the 64oz green/ teal and it’s the best water bottle. It’s sturdy and doesn’t leak. I even bought the silicone thing that goes on the bottom to protect your bottle and the surfaces your put it on.Outstanding design!. Really enjoy the color, size, and sport mouth piece! Bummer though that on my second day it fell, got a dent, and now I’m guessing the middle liner busted and now rattles.. We have a few of these Hydro cell water bottles. My son noticed the little clear stopper thing was missing from his lid and thus leaking. I messaged them directly and they sent a replacement lid immediately no questions asked. Can't ask for better customer service! Highly recommend!. Good
The first time I purchased a double wall SS water bottle, I went for the expensive name brand but ever since I discovered 
these ones 3 years ago... never again! At a quarter or so of the price of the name brand it it EXACTLY the SAME quality! I can put ice in these, water, and leave in the car with the windows up on a 90* day and come back 8+ hours later from the 
theme park and BOOM! STILL HAS ICE IN IT! Ya'll know how hot cars get in the summer with the windows up... The color choices are amazing, the size options are there, and you get multiple lid options in one box. YES, PLEASE! I have purchased many of these for myself and as gifts and I will continue to because they are quality without breaking the bank!. I forgot to dump my ice out when I came home one night and it was still there in the morning! Keeps drinks really cold and doesn’t spill (if the lid is closed all the way. It will leak if not tightened properly or if the “straw” is up and tips over). Very pleased with my purchase!. this is a great water bottle. my husband loves it. only sad thing is he dropped it once and the lid that comes up w a straw broke but it still works bc you get a second screw cap lid ! perfect size for everyday use. 
I use this hydro for cold water when I go to work or work out. It definitely keeps my water cold all day. It comes with two straws and another kind of top. I love the color, super vibrant. Definitely would recommend because it serves purpose of insulating but not for ridiculous price.. I use this every day for my hot tea at work. I take it from home to work and it keeps my tea hot so I would bet it also keeps drinks cold. It's sturdy AF and comes with a flat lid as well as a lid with a straw. It never leaks or spills. I got the size I thought I needed and it was perfect.. It will hold ice ALL day, love 
using it. Awesome water bottle. I bought the 64oz green/ teal and it’s the best water bottle. It’s sturdy and doesn’t leak. I even bought the silicone thing that goes on the bottom to protect your bottle and the surfaces your put it on.Outstanding design!. Really enjoy the color, size, and sport mouth piece! Bummer though that on my second day it fell, got a dent, and now I’m guessing the middle liner busted and now rattles.. We have a few of these Hydro cell water bottles. My son noticed the little clear stopper thing was missing from his lid and thus leaking. I messaged them directly and they sent a replacement lid immediately no questions asked. Can't ask for better customer service! Highly recommend!. Good
The first time I purchased a double wall SS water bottle, I went for the expensive name brand but ever since I discovered 
these ones 3 years ago... never again! At a quarter or so of the price of the name brand it it EXACTLY the SAME quality! I can put ice in these, water, and leave in the car with the windows up on a 90* day and come back 8+ hours later from the 
theme park and BOOM! STILL HAS ICE IN IT! Ya'll know how hot cars get in the summer with the windows up... The color choices are amazing, the size options are there, and you get multiple lid options in one box. YES, PLEASE! I have purchased many of these for myself and as gifts and I will continue to because they are quality without breaking the bank!. I forgot to dump my ice out when I came home one night and it was still there in the morning! Keeps drinks really cold and doesn’t spill (if the lid is closed all the way. It will leak if not tightened properly or if the “straw” is up and tips over). Very pleased with my purchase!. this is a great water bottle. my husband loves it. only sad thing is he dropped it once and the lid that comes up w a straw broke but it still works bc you get a second screw cap lid ! perfect size for everyday use. 
I use this hydro for cold water when I go to work or work out. It definitely keeps my water cold all day. It comes with two straws and another kind of top. I love the color, super vibrant. Definitely would recommend because it serves purpose of insulating but not for ridiculous price.. I use this every day for my hot tea at work. I take it from home to work and it keeps my tea hot so I would bet it also keeps drinks cold. It's sturdy AF and comes with a flat lid as well as a lid with a straw. It never leaks or spills. I got the size I thought I needed and it was perfect.. It will hold ice ALL day, love 
using it. Awesome water bottle. I bought the 64oz green/ teal and it’s the best water bottle. It’s sturdy and doesn’t leak. I even bought the silicone thing that goes on the bottom to protect your bottle and the surfaces your put it on.Outstanding design!. Really enjoy the color, size, and sport mouth piece! Bummer though that on my second day it fell, got a dent, and now I’m guessing the middle liner busted and now rattles.. We have a few of these Hydro cell water bottles. My son noticed the little clear stopper thing was missing from his lid and thus leaking. I messaged them directly and they sent a replacement lid immediately no questions asked. Can't ask for better customer service! Highly recommend!. Good
The first time I purchased a double wall SS water bottle, I went for the expensive name brand but ever since I discovered 
these ones 3 years ago... never again! 
"""
reviews = reviews + reviews + reviews + reviews + reviews + reviews + reviews
print(len(re. findall(r'\w+', reviews)))
print(len(reviews))

doc_rew = Document(page_content=reviews)

text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0, separator="\n")
#texts2 = text_splitter2.create_documents([reviews])
texts = text_splitter.split_documents([doc_rew])

def doc_summary(docs):
    print (f'You have {len(docs)} document(s)')
    
    num_words = sum([len(doc.page_content.split(' ')) for doc in docs])
    
    print (f'You have roughly {num_words} words in your docs')
    print ()
    print (f'Preview: \n{docs[0].page_content.split(". ")[0]}')

doc_summary(texts)

llm = OpenAI(openai_api_key='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')

#chain = load_summarize_chain(llm, chain_type="stuff", verbose=True)
#chain.run(texts)

#chain = load_summarize_chain(llm, chain_type="map_reduce", verbose=True)
#print(chain.run(texts)) # 1.5 min
# The customer purchased a 64oz green/teal Hydro Cell water bottle and was pleased with the design, color, size, and sport mouthpiece. After experiencing a dent and rattling sound, customer service sent a replacement lid without questions asked. It is of the same quality as a name-brand product, but much more affordable, and is available in multiple colors and sizes with two lids and a straw. Highly recommended.   

# Summarize refine
# chain = load_summarize_chain(llm, chain_type="refine", verbose=True)
# print(chain.run(texts[:5]))

# Map re-rank
chain = load_qa_chain(llm, chain_type="map_rerank", return_intermediate_steps=True)
query = "Provide the summary of the product in 50 words"

try:
    result = chain({"input_documents": texts, "question": query}, return_only_outputs=True)
except ValueError as e:
    result = str(e)
    if not result.startswith("Could not parse output: "):
        raise e
    result = result.removeprefix("Could not parse output: ").removesuffix("`")

print(result)  # min 40 min