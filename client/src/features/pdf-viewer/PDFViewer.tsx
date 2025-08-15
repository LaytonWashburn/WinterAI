import { useState, useEffect, useRef, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './PDFViewer.module.css';

interface PDFViewerProps {
    file: File | null;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export const PDFViewer = ({ file }: PDFViewerProps) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageWidth, setPageWidth] = useState<number>(800); // default width
    const containerRef = useRef<HTMLDivElement>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    // ResizeObserver to dynamically update page width
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Initial width
        setPageWidth(container.clientWidth);

        const observer = new ResizeObserver(() => {
            if (container) setPageWidth(container.clientWidth);
        });

        observer.observe(container);

        return () => observer.disconnect();
    });

    const fileURL = useMemo(() => file ? URL.createObjectURL(file) : null, [file]);

    // Cleanup blob URL
    useEffect(() => {
        if (!fileURL) return;
        return () => URL.revokeObjectURL(fileURL);
    }, [fileURL]);

    if (!file || !fileURL) return <div>No file uploaded</div>;

    return (
        <div ref={containerRef} className={styles.pdfContainer}>
            <Document file={fileURL} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from({ length: numPages }, (_, index) => (
                    <section key={index} className={styles.pdfPage}>
                        <Page
                            pageNumber={index + 1}
                            width={pageWidth}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </section>
                ))}
            </Document>
        </div>
    );
};
