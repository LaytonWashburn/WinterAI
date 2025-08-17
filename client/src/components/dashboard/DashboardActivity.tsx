import styles from "./DashboardActivity.module.css";

interface DashboardActivityProps {
    service: string;           // e.g., "career", "finance"
    action: string;            // e.g., "uploaded_resume"
    details?: Record<string, any>; // Optional JSON details
    created_at: string;         // ISO date string
}

export const DashboardActivity = ( { service, action, details, created_at}: DashboardActivityProps) => {


    return (
        <>
            <div
                className={styles.content}
            >
                <p>{action}</p>
                {/* <p>{details}</p> */}
                <p>{created_at}</p>
            </div>
        </>
    )
}