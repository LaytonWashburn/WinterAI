import { Service } from "./Service"
import sytles from "./Services.module.css"


export const Services = () => {

    const services = [
        {id: 1, name: 'Personalized Agent', description: 'Helps streamline your tasks and boost productivity.'},
        {id: 2, name: '3D Viewer', description: 'Visualizes complex 3D models with ease.'},
        {id: 3, name: 'Computer Vision', description: 'Analyzes and interprets visual data effectively.'},
    ]


    return(
        <section id={sytles.services}>
            {
                services.map((service) => (
                    <Service {...service} />
                ))
            }
        </section>
    )
}