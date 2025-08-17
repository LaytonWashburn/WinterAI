
import styles from "./GuestMission.module.css";


export const GuestMission = () => {


    return(
        <>
            <div 
                className={styles.missionWrapper}
            >
                <div 
                    className={styles.mission}
                >
                    <div className={styles.missionTitle}>
                        <h1>Our Mission</h1>
                        <hr />
                        <div className={styles.verticalLine}></div>
                    </div>
                    <div className={styles.infoContainer}>
                        <p className={styles.text}>Making lives easier every day</p>
                        <p className={styles.text}>Quality management system enhanched with AI</p>
                        <p className={styles.text}>With the current AI boom, we're safely integrating it into daily life</p>
                    </div>
                </div>

            </div>
        </>
    )
}