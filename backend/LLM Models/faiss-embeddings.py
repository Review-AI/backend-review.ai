from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain import OpenAI, VectorDBQA
import re
from langchain.document_loaders import DirectoryLoader
from langchain.docstore.document import Document


# loader = DirectoryLoader('./data/PaulGrahamEssaySmall/', glob='**/*.txt')
# documents = loader.load()
# print(len(documents))
# text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
# texts = text_splitter.split_documents(documents)
# print(len(texts))
# text_full = ""
# for text in texts:
#     text_full += text.page_content
# print(text_full)
# print(len(text_full))
# print(len(re. findall(r'\w+', text_full)))

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
print("After splitting")
print(len(texts))

embeddings = OpenAIEmbeddings(openai_api_key = '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')

from langchain.vectorstores import FAISS


docsearch = FAISS.from_documents(texts, embeddings)
print(docsearch)
qa = VectorDBQA.from_chain_type(llm=OpenAI(openai_api_key = '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', verbose= True), chain_type="stuff", vectorstore=docsearch)

query = "Provide a summary of the product in 50 words"
print(qa.run(query))

query = "Does the bottle leak?"
print(qa.run(query))

query = "Is the bottle heavy to carry?"
print(qa.run(query))