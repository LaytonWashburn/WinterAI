
import styles from "./GuestTestimonials.module.css";



export const GuestTestimonials = () => {


    return (
        <>
            <div
                className={styles.main}
            >
                <h1>Testimonials</h1>
                <div 
                    className={styles.testimonial}
                >
                    <p
                        className={styles.testimonialText}
                    >
                        This platform organzied my life and helped me see things I didn't know I was doing!
                    </p>
                    <h5 className={styles.testimonialName}>— Bob</h5>
                </div>
                <div 
                    className={styles.testimonial}
                >
                    <p
                        className={styles.testimonialText}
                    >
                        My productivity increased 10x with this platform. I don't know how I was living before!
                    </p>
                    <h5 className={styles.testimonialName}>— Angie</h5>
                </div>
                <div 
                    className={styles.testimonial}
                >
                    <p
                        className={styles.testimonialText}
                    >
                        Best product ever! I found ways to save money through their finance tool.
                    </p>
                    <h5 className={styles.testimonialName}>— Angie</h5>
                </div>
            </div>
        </>
    )
}