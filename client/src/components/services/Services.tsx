import { Service } from "./Service"
import type { Services as ServicesType } from "../../types/servicesType";
import sytles from "./Services.module.css"

interface ServicesProps {
    services: ServicesType[];
}

export const Services = ({ services }: ServicesProps) => {

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