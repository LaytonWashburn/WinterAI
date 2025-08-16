
import styles from "./GuestItem.module.css";


interface GuestItemProps {
    title: string;
    paragraphs: string[]; // This will hold the text for each <p> tag
    image: string; // The image path
    id: number;
    item: number;
    forwardCallback: () => void;
    backwardCallback: () => void;
}

export const GuestItem = ({ title, paragraphs, image, item, 
                            forwardCallback, backwardCallback }: GuestItemProps) => {

    return (
        <section
            className={`${styles.section} ${item}`}
        >
            <div className={styles.contentWrapper}>
                <div>
                    <img src={image} alt="item" />
                </div>
                <div>
                    <h1>
                        { title }
                    </h1>
                    {
                        paragraphs.map((paragraph) => {
                            return(
                                <p className={styles.paragraph}>
                                    {
                                        paragraph
                                    }
                                </p>
                            )
                        })
                    }
                    <button 
                        className={`material-symbols-outlined ${styles.arrowIcon}`}
                        onClick={backwardCallback}
                    >
                        arrow_back
                    </button>
                    <button 
                        className={`material-symbols-outlined ${styles.arrowIcon}`}
                        onClick={forwardCallback}
                    >
                        arrow_forward
                    </button>
                </div>
            </div>
            
        </section>
    )
}