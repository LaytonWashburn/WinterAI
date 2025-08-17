import { useAuth } from "../../context/AuthContext"
import { DashboardRecentActivity } from "../../components/dashboard/DashboardRecentActivity";
import styles from "./DashboardPage.module.css";

export const DashboardPage = () => {

    const {user} = useAuth();
    return (
        <main id={styles.dashboard}>
            <h1>Welcome to Your Dashboard {user.username}</h1>
            <div className={styles.metrics}>
                <div className={styles.metricsLeft}>
                </div>

                <div className={styles.metricsRight}>
                    <DashboardRecentActivity />
                </div>
            </div>
        </main>

    )
}