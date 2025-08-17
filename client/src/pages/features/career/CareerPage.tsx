
import { Services } from "../../../components/services/Services"
import styles from "./CareerPage.module.css";

const careerServices = [
    {id:0, name: "Web Search", description: "Search the web.", link:"/services/career/search"},
    {id: 1, name: 'Resume Agent', description: 'Helps streamline your tasks and boost productivity.', link:"/services/career/resume"},

    // {id: 2, name: '3D Viewer', description: 'Visualizes complex 3D models with ease.', link: "/viewer"},
    // {id: 3, name: 'Computer Vision', description: 'Analyzes and interprets visual data effectively.', link:"/"},
]


export const CareerPage = () => {

    return(
        <main
            className={styles.main}
        >
            <h1>Build Your Future</h1>
            <Services services={careerServices} />
        </main>
    )
    
}