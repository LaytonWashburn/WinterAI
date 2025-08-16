from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain
import json
from app.api.v1.resume.service.llm import llm


# Create the prompt
prompt_template = """
Extract structured information from the following text.
Return a JSON object with descriptive keys capturing job titles, companies, skills, projects, education, experience, and more.
The keys should be flexible and represent the resume.
The resulting dictionary after you output it will be compared to a job posting
Text:
{text}
"""

prompt = ChatPromptTemplate.from_template(prompt_template)

# Create the chain
chain = LLMChain(llm=llm, prompt=prompt)


async def extract_text_using_llm(text: str, chain: LLMChain) -> dict:
    """
    Extract structured information from text using the given LLMChain.
    Returns a dictionary (parsed JSON) or a fallback with raw output.
    """
    # Run the chain
    result = await chain.arun(text=text)
    print("LLM raw output:", result)

    # Parse JSON
    try:
        structured_data = json.loads(result)
    except json.JSONDecodeError:
        structured_data = {"raw_output": result}

    return structured_data


# async def extract_text_using_llm(text, chain):
#     """
#     Extract structured information from text using the given LLMChain.
#     Returns a dictionary (parsed JSON) or a fallback with raw output.
#     """
#     # Run the chain
#     result = await chain.arun(text=text)  # or text=text depending on template

#     # Parse JSON
#     try:
#         structured_data = json.loads(result)
#     except json.JSONDecodeError:
#         structured_data = {"raw_output": result}

#     return structured_data
