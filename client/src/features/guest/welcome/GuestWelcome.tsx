import welcome from "../../../assets/welcome.png";
import styles from "./GuestWelcome.module.css";

export const GuestWelcome = () => {
  return (
    <div className={styles.section}>

      <div className={styles.content}>
        <h1 className={styles.header}>
          Give the Stress to AI
        </h1>
        <p className={styles.p1}>
          Discover how to manage your life with our intelligent AI platform.
        </p>
        <p className={styles.p2}>
            Our platfrom provides an easy way to arrange and organize your responsibilities using AI.
        </p>
        <p className={styles.p2}>
          Less stress and more focus on Life's important details
        </p>
      </div>
        <img 
            src={welcome} 
            alt="welcome" 
        />
    </div>
  );
};