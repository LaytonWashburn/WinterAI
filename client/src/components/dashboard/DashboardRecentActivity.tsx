import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardActivity } from './DashboardActivity';
import styles from "./DashboardRecentActivity.module.css";

export interface Action {
  id: number;
  user_id: number;
  service: string;
  action: string;
  details: any;
  created_at: string; // ISO date string
}

export const DashboardRecentActivity = ( {}) => {


    const { token } = useAuth();
    const [activities, setActivities] = useState<Action[] | null>(null);

    const getRecentActivity = async (limit: number = 10, offset: number = 0) => {
        console.log("In the get recent activity");
        const url = new URL(`${import.meta.env.VITE_API_URL}/v1/actions`);
        url.searchParams.append("limit", limit.toString());
        url.searchParams.append("offset", offset.toString());

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
            "Authorization": `Bearer ${token}`, // JWT from login
            "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch actions: ${response.statusText}`);
        }

        const data: Action[] = await response.json();
        console.log("Here is the data: ", data);
        setActivities(data);
    }

    useEffect(() => {
        getRecentActivity();
    }, []);


    return (
        <div
            className={styles.main}
        >
            <div
                className={styles.title}
            >
                Recent Activity
            </div>
            <div
                className={styles.activityContainer}
            >
                {
                    activities && activities.map((activity) => {
                        return(
                            <DashboardActivity 
                                service={activity.service}
                                action={activity.action}
                                details={activity.details}
                                created_at={new Date(activity.created_at).toLocaleString("en-US", {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}