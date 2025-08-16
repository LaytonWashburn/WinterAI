
import { GuestWelcome } from "../../features/guest/welcome/GuestWelcome";
import { GuestItemCarousel } from "../../features/guest/carousel/guestItemCarousel";
import type { GuestCarouselItemData } from "../../types/guestCarouselType";
import styles from "./GuestPage.module.css";
import financeImg from "../../assets/finance.png";
import careerImg from "../../assets/career.png";
import entertainmentImg from "../../assets/entertainment.png";

const items: GuestCarouselItemData[] =  [
    {id:0, title: "Finance", image:  financeImg, paragraphs: ["Get insight into your finances"]},
    {id:1, title: "Career", image: careerImg, paragraphs: ["Provides metrics and assistance for your career"]},
    {id:2, title: "Entertainment", image: entertainmentImg, paragraphs: ["Get ideas for more activites"]}
]

export const GuestPage = () => {
    return (
        <section
            id={styles.guest}
        >  
            <GuestWelcome />
            <GuestItemCarousel items={items}/>
        </section> 
    );
}