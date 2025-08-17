import { Link } from 'react-router-dom';
import styles from "./Service.module.css";


interface Service {
    id: number;
    name: string;
    description: string;
    link: string;
}

export const Service = ({id, name, description, link}: Service) => {


    return(
        <Link to={link}
            id={styles.service} 
            key={id}>
            <h2>{name}</h2> 
            <p>{description}</p>
        </Link>
    )
}