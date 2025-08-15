import React from 'react';
import styles from './ResumeUploader.module.css';

interface ResumeUploaderProps {
    uploadFile(file: File): any;
    showDelete: boolean;
    onDelete?: () => void;
}

export const ResumeUploader = ({ uploadFile, showDelete, onDelete }: ResumeUploaderProps) => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            uploadFile(e.target.files[0]);
        }
    };

    return (
        <section className={styles.uploaderSection}>
            <h2 className={styles.title}>A Simple Resume Revision Tool!</h2>

            <label htmlFor="fileInput" className={styles.fileInputLabel}>
                <span className={styles.uploadGroup}>
                    <span className="material-symbols-outlined">upload</span>
                    Upload a Resume
                </span>
                {showDelete && (
                    <span
                        id={styles.deleteIcon}
                        className="material-symbols-outlined"
                        onClick={onDelete}
                    >
                        delete
                    </span>
                )}
            </label>

            <input
                id="fileInput"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className={styles.fileInput}
            />

            <button className={styles.reviseButton}>
                Start
            </button>
        </section>
    );
};