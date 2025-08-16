from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import os

llm = ChatOpenAI(model_name="gpt-3.5-turbo",
                 temperature=0,
                 openai_api_key=os.getenv("OPENAI_API_KEY"),
                 max_retries=3)  