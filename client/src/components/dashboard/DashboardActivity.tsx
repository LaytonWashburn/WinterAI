import styles from "./DashboardActivity.module.css";

// interface DashboardActivityProps {
//     service: string;           // e.g., "career", "finance"
//     action: string;            // e.g., "uploaded_resume"
//     details?: Record<string, any>; // Optional JSON details
//     created_at: string;         // ISO date string
// }

// export const DashboardActivity = ( { service, action, details, created_at}: DashboardActivityProps) => {


//     return (
//         <>
//             <div
//                 className={styles.content}
//             >
//                 <p>Activity: {action}</p>
//                 {/* <p>{details}</p> */}
//                 <p>Time: {created_at}</p>
//             </div>
//              <hr />
//         </>
//     )
// }

export const DashboardActivity = ({ service, action, details, created_at }: DashboardActivityProps) => {
  return (
    <div className={styles.activityItem}>
      <div className={styles.activityHeader}>
        <span className={styles.action}>{action.replace("_", " ")}</span>
        <span className={styles.timestamp}>{created_at}</span>
      </div>
      {details && (
        <div className={styles.details}>
          {Object.entries(details).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {String(value)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
