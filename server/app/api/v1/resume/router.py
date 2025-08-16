from fastapi import APIRouter, File, UploadFile, Form, Depends
from sentence_transformers import util
from app.api.v1.resume.schema.resume import ResumeReviseRequest
from app.api.v1.resume.service.resume import parse_resume_to_text, clean_text, get_embedding_model, EmbeddingModel

resume_router = APIRouter(prefix="/resume")

@resume_router.get("/")
def resume_index():
    return {"message": "Hello World from the Resume Router"}


@resume_router.post("/")
async def revise_resume(
    file: UploadFile = File(...),
    job_posting: str = Form(...),
    model: EmbeddingModel = Depends(get_embedding_model)
):
    # Extract and clean
    resume_text = clean_text(parse_resume_to_text(file))
    job_text = clean_text(job_posting)

    # Generate embeddings
    resume_emb = model.encode(resume_text)
    job_emb = model.encode(job_text)

    # resume_data = await extract_text_using_llm(resume_text, chain)
    # print("Resume data: ", resume_data)

    # Semantic similarity
    similarity = util.cos_sim(resume_emb, job_emb).item()

    return {"resumeScore": similarity}
# @resume_router.post("/")
# def revise_resume(file: UploadFile = File(...),
#                   job_posting: str = Form(...)):
#     print("Here is the job posting", job_posting)
#     resume_text = parse_resume_to_text(file)
#     resume_text = clean_text(resume_text)
#     job_text = clean_text(job_posting)
#     cosine_similarity = calculate_cosine_similarity(job_text=job_text, resume_text=resume_text)
#     return {"text": cosine_similarity}