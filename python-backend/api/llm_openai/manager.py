
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain import OpenAI, VectorDBQA
import re
from langchain.document_loaders import DirectoryLoader
from langchain.docstore.document import Document
from langchain.vectorstores import FAISS

llm_map = {}

def create_llm_model(reviews):

    doc_rew = Document(page_content=reviews)

    text_splitter = CharacterTextSplitter(chunk_size=2000, chunk_overlap=0, separator="\n")
    texts = text_splitter.split_documents([doc_rew])

    embeddings = OpenAIEmbeddings(openai_api_key = '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')

    docsearch = FAISS.from_documents(texts, embeddings)
    qa = VectorDBQA.from_chain_type(llm=OpenAI(openai_api_key = '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', verbose= True), chain_type="stuff", vectorstore=docsearch)

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
        return "Bot is unable to get answer"
    output = model.run(question)
    return output


    