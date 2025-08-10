import { Link } from 'react-router-dom';
import styles from "./Service.module.css";


interface Service {
    id: number;
    name: string;
    description: string
}

export const Service = ({id, name, description}: Service) => {


    return(
        <Link to={"/"}
            id={styles.service} 
            key={id}>
            <h2>{name}</h2> 
            <p>{description}</p>
        </Link>
    )
}