from fastapi import UploadFile
from sklearn.feature_extraction.text import TfidfVectorizer
from sentence_transformers import SentenceTransformer, util
from sklearn.metrics.pairwise import cosine_similarity
import pdfplumber
import io
import re



class EmbeddingModel:
    _instance = None
    _initialized = False  # track initialization

    def __new__(cls, model_name='all-mpnet-base-v2'):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, model_name='all-mpnet-base-v2'):
        if not self._initialized:
            self.model = SentenceTransformer(model_name)
            self._initialized = True

    def encode(self, text, convert_to_tensor=True):
        return self.model.encode(text, convert_to_tensor=convert_to_tensor)


def get_embedding_model():
    return EmbeddingModel()

def parse_resume_to_text(file: UploadFile):
    """
    Extract all text from an uploaded PDF file.
    Returns a single string containing the text of all pages.
    """
    text = ""
    pdf_bytes = file.file.read()  # read the file contents
    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                print("Adding text: ", page_text)
                text += page_text + "\n"
    return text


def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()
    # text = re.sub(r'\s+', ' ', text)  # normalize spaces
    # return text.lower().strip()



def calculate_cosine_similarity(job_text:str, resume_text:str):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume_text, job_text])
    similarity = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]
    print(f"Overall resume-job similarity: {similarity:.2f}")
    return similarity




# from fastapi import UploadFile
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sentence_transformers import SentenceTransformer, util
# from sklearn.metrics.pairwise import cosine_similarity
# import pdfplumber
# import io
# import re

# def parse_resume_to_text(file: UploadFile):
#     """
#     Extract all text from an uploaded PDF file.
#     Returns a single string containing the text of all pages.
#     """
#     text = ""
#     pdf_bytes = file.file.read()  # read the file contents
#     with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
#         for page in pdf.pages:
#             page_text = page.extract_text()
#             if page_text:
#                 print("Adding text: ", page_text)
#                 text += page_text + "\n"
#     return text


# def clean_text(text):
#     text = text.lower()
#     text = re.sub(r'[^a-z0-9\s]', ' ', text)
#     text = re.sub(r'\s+', ' ', text)
#     return text.strip()
#     # text = re.sub(r'\s+', ' ', text)  # normalize spaces
#     # return text.lower().strip()


# # ------------------- Dependency Injection Singleton -------------------

# class EmbeddingModel:
#     _instance = None
#     _initialized = False  # track initialization

#     def __new__(cls, model_name='all-mpnet-base-v2'):
#         if cls._instance is None:
#             cls._instance = super().__new__(cls)
#         return cls._instance

#     def __init__(self, model_name='all-mpnet-base-v2'):
#         if not self._initialized:
#             self.model = SentenceTransformer(model_name)
#             self._initialized = True

#     def encode(self, text, convert_to_tensor=True):
#         return self.model.encode(text, convert_to_tensor=convert_to_tensor)
    
# # class EmbeddingModel:
# #     _instance = None

# #     def __new__(cls, model_name='all-mpnet-base-v2'):
# #         if cls._instance is None:
# #             cls._instance = super().__new__(cls)
# #             cls._instance.model = SentenceTransformer(model_name)
# #         return cls._instance

# #     def encode(self, text, convert_to_tensor=True):
# #         return self.model.encode(text, convert_to_tensor=convert_to_tensor)


# def get_embedding_model():
#     return EmbeddingModel()

# # ------------------- Helpers -------------------
# def parse_resume_to_text(file: UploadFile):
#     text = ""
#     pdf_bytes = file.file.read()
#     with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
#         for page in pdf.pages:
#             page_text = page.extract_text()
#             if page_text:
#                 text += page_text + "\n"
#     return text

# def clean_text(text):
#     text = text.lower()
#     text = re.sub(r'[^a-z0-9\s]', ' ', text)
#     text = re.sub(r'\s+', ' ', text)
#     return text.strip()