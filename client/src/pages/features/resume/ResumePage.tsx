import { useState, useEffect } from 'react';
import { ResumeUploader } from '../../../features/resume/ResumeUploader';
import { PDFViewer } from '../../../features/pdf-viewer/PDFViewer';
import styles from './ResumePage.module.css';

export const ResumePage = () => {

    const [file, setFile] = useState<File | null>(null);

    const uploadFile = (file: File) => {
        setFile(file);
    }

    const onDelete = () => {
        setFile(null);
    }

    useEffect(() => {
        console.log(file);
    }, [file])

    return(
        <main id={styles.resumePage}>
            <ResumeUploader 
                uploadFile={uploadFile} 
                onDelete={onDelete}
                showDelete={file ? true : false}/>
            {
                file &&  <PDFViewer file={file} />
                
            }
        </main>
    )
}