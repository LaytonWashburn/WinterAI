
import { GuestWelcome } from "../../features/guest/welcome/GuestWelcome";
import styles from "./GuestPage.module.css";


export const GuestPage = () => {
    return (
        <section
            id={styles.guest}
        >  
            <GuestWelcome />
        </section> 
    );
}