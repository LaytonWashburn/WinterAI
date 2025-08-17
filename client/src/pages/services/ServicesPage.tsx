
import { Services } from "../../components/services/Services";
import styles from "./ServicesPage.module.css";

const winteraiServices = [
    {id:0, name: "Career", description: "Boost your career", link: "/services/career"},
    {id:1, name: "Finance", description: "Insight into your money", link: "/services/finances"},
    {id:2, name: "Entertainment", description: "Find what you like to do", link: "/services/entertainment"}
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