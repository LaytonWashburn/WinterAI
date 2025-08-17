import { useState, useEffect } from 'react';
import { ResumeUploader } from '../../../features/resume/ResumeUploader';
import { PDFViewer } from '../../../features/pdf-viewer/PDFViewer';
import { ResumeScore } from '../../../features/resume/ResumeScore';
import { useAuth } from '../../../context/AuthContext';
import styles from './ResumePage.module.css';

export const ResumePage = () => {

    const [file, setFile] = useState<File | null>(null);
    const [jobPosting, setJobPosting] = useState<string>("");
    const [resumeScore, setResumeScore] = useState<number | null>(null);

    const { token } = useAuth();

    const uploadFile = (file: File) => {
        setFile(file);
    }

    const onDelete = () => {
        setFile(null);
        setResumeScore(null);
    }

    const onStart = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("job_posting", jobPosting);
        console.log("Here is the token: ", token);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/resume/`, {
            method: "post",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`  // <-- add your JWT here
            }
        });

        const data = await response.json();
        console.log("Here are the results: ", data);
        if (data && data.resumeScore) {
            setResumeScore(data.resumeScore);
        }

    }

    const onJobPosting = (jobPosting: string) => {
        setJobPosting(jobPosting)
    }

    useEffect(() => {
        console.log(file);
    }, [file])

    return(
        <main id={styles.resumePage}>
            <ResumeUploader 
                uploadFile={uploadFile} 
                onStart={onStart}
                onDelete={onDelete}
                onJobPosting={onJobPosting}
                jobPosting={jobPosting}
                showDelete={file ? true : false}/>
            {
                resumeScore && <ResumeScore score={resumeScore} />
            }
            {
                file &&  <PDFViewer file={file} />
                
            }
        </main>
    )
}