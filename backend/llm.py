# References :
# https://python.langchain.com/en/latest/modules/memory/getting_started.html
# https://python.langchain.com/en/latest/modules/memory/types/buffer.html
# https://www.pinecone.io/learn/langchain-conversational-memory/
from langchain.memory import ConversationBufferMemory
from langchain.llms import OpenAI
from langchain.chains import ConversationChain

reviews = [
  """I bought this watch on July 2022 it worked perfectly fine for about 6 months and then it started showing this message on the screen (see attached picture) and ringing every second with that "notification"Sometimes it's "connected" but still 
not received anything.So don't waist money on this piece of garbage.""",
  "So far I haven't witnessed anything like the experenced of previous models that I bought for her as a gift, and there's not much that she has not had a negative reactiontowards(before). And and along with what negative word or reaction toward something that was purchased before,even what came of the previous models purchased before.",
  'Love my watch, just still really learning all the functions.',
  'I love my watch! I get complements on it all the time',
  "Loved this watch to start. Haven't owned it for even a year yet and it has stopped working and now say device corrupt when trying to reset or power on.",
  'Worst decision to ever buy this. It’s a fossil, but it has a Google platform. It’s very difficult to pair. It’s very difficult to use. It’s very difficult to size either by a fossil or bio google but don’t buy a combo of this just sitting in the drawer',
  "Beautiful watch, has so many features and love the Google play store is on it to add even more features like my Google maps and Amazon music. Can send and receive calls and texts by Bluetooth and wifi so no addition service is needed.No Knicks scratches or marks. Do wish it had blood pressure and oxygen features and can't use the sleep tracker cause it dies by the end of the night, but it does charge very fast and is charged for the day It's def worth the price",
  "The battery is absolutely terrible. On a full charger, will be lucky to get 2 hours out of it and that's not using it much. Very disappointed",
  'DEntro de la caja habia un bote de jabon de liquido para lavar trastes, en otra reseña, subi la fotografia y comento que el dia de qyer 13/3/202023 realizace la devolucion con la guia proporcionada.',
  'Not easy to navigate or use.'
]

llm = OpenAI(temperature=0.5, openai_api_key="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", model_name="text-davinci-003")
conversation = ConversationChain(
    llm=llm,
    verbose=True,
    memory=ConversationBufferMemory(return_messages=True)
)

#print(conversation)
conversation.memory.chat_memory.add_user_message("The comments are as follows:")
#reviews = reviews + reviews + reviews + reviews + reviews + reviews + reviews
print(len(reviews))
for review in reviews:
    conversation.memory.chat_memory.add_user_message(review)

conversation.predict(input="Please give a description of the above product in 50 words.")

df = conversation.memory.load_memory_variables({})
messages = df["history"]
print(df["history"][len(messages)-1])

conversation.predict(input="Does the watch supports bluetooth calling?")
df = conversation.memory.load_memory_variables({})
messages = df["history"]
print(df["history"][len(messages)-1])

