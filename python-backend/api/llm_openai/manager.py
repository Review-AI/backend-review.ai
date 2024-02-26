
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain import OpenAI, VectorDBQA
import re
from langchain.document_loaders import DirectoryLoader
from langchain.docstore.document import Document
from langchain.vectorstores import FAISS
from langchain import PromptTemplate
from env import openai_key
import os 

llm_map = {}

def create_llm_model(reviews):

    doc_rew = Document(page_content=reviews)

    text_splitter = CharacterTextSplitter(chunk_size=2000, chunk_overlap=0, separator="\n")
    texts = text_splitter.split_documents([doc_rew])

    embeddings = OpenAIEmbeddings(openai_api_key = openai_key)

    print(embeddings)
    docsearch = FAISS.from_documents(texts, embeddings)
    qa = VectorDBQA.from_chain_type(llm=OpenAI(openai_api_key = openai_key, verbose= True,  model="gpt-3.5-turbo-instruct"), chain_type="stuff", vectorstore=docsearch)

    print(qa)
    return qa

def get_product_description(client_id, reviews):
    # Since product description will be called first so it will not be added to llm_map
    model = create_llm_model(reviews)
    llm_map[client_id] = model
    query = "Provide a summary of the product in 50 words"
    output = model.run(query)
    return output

def get_chat_answer(client_id, question):
    model = llm_map.get(client_id)
    if not model:
        return "Not found in reviews"
    output = model.run(question)
    print(output)
    if output.strip().strip('.') == "I don't know":
        output = "Not found in reviews"
    return output

def get_product_details(product_name,  short_reviews):
    llm = OpenAI(openai_api_key = openai_key, verbose= True, model="gpt-3.5-turbo-instruct")

    name_template = "Give one option for 2 word name without ordered/unordered list for this product, 1st word to be brand and 2nd word to be product name from: {product_name}."
    name_prompt_template = PromptTemplate(template=name_template, input_variables=["product_name"])
    short_product_name = llm(name_prompt_template.format(product_name = product_name))
    short_product_name= short_product_name.replace("Answer:", "").strip().strip(".").strip('"')
    print(short_product_name)

    batch_template = "What is the percentage of {prompt} based on reviews: {short_reviews}"
    batch_prompt_template = PromptTemplate(template=batch_template, input_variables=["prompt", "short_reviews"])
    
    product_likeness = llm(batch_prompt_template.format(prompt = "users who have liked the product", short_reviews=short_reviews))
    product_likeness_percent = re. findall(r"[-+]?(?:\d*\.*\d+)", product_likeness)
    product_likeness_percent = product_likeness_percent[0] if product_likeness_percent else 0
    print(product_likeness_percent)

    product_complaints = llm(batch_prompt_template.format(prompt = "users who have complaint about the product", short_reviews=short_reviews))
    product_complaints_percent = re. findall(r"[-+]?(?:\d*\.*\d+)", product_complaints)
    product_complaints_percent = product_complaints_percent[0] if product_complaints_percent else 0
    print(product_complaints_percent)
    
    return {
        "product_name": short_product_name, 
        "product_likeness": product_likeness_percent,
        "product_complaints": product_complaints_percent
    }


    