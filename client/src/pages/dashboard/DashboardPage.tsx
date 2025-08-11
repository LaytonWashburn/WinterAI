import { useAuth } from "../../context/AuthContext"
import styles from "./DashboardPage.module.css";

export const DashboardPage = () => {

    const {user} = useAuth();
    return (
        <main
            id={styles.dashboard}
        >
            Welcome to WinterAI { user.username }
        </main>
    )
}