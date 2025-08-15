import { Service } from "./Service"
import sytles from "./Services.module.css"


export const Services = () => {

    const services = [
        {id:0, name: "Web Search", description: "Search the web.", link:"/search"},
        {id: 1, name: 'Resume Agent', description: 'Helps streamline your tasks and boost productivity.', link:"/resume"},
        // {id: 2, name: '3D Viewer', description: 'Visualizes complex 3D models with ease.', link: "/viewer"},
        // {id: 3, name: 'Computer Vision', description: 'Analyzes and interprets visual data effectively.', link:"/"},
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