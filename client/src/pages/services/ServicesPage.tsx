
import { Services } from "../../components/services/Services";
import styles from "./ServicesPage.module.css";

const winteraiServices = [
    {id:0, name: "Career", description: "Boost your career", link: "/services/career"},
    {id:1, name: "Finance", description: "Insight into your money", link: "/services/finances"},
    {id:2, name: "Health", description: "Get health recommendations", link: "/services/health"},
    {id:3, name: "Entertainment", description: "Find what you like to do", link: "/services/entertainment"},
    {id:4, name: "Security", description: "Protect your data", link: "/services/security"}
]


export const ServicesPage = () => {
    return (
        <main
            className={styles.main}
        >
            < Services services={winteraiServices}  />
        </main>
    )
}