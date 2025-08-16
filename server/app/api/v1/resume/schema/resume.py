from pydantic import BaseModel


class ResumeReviseRequest(BaseModel):
    resume: str
    job_posting: str