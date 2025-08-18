
import { GuestWelcome } from "../../components/guest/welcome/GuestWelcome";
import { GuestItemCarousel } from "../../components/guest/carousel/guestItemCarousel";
import { GuestMission } from "../../components/guest/misison/GuestMission";
import { GuestTestimonials } from "../../components/guest/testimonials/GuestTestimonials";
import type { GuestCarouselItemData } from "../../types/guestCarouselType";
import styles from "./GuestPage.module.css";
import financeImg from "../../assets/finance.png";
import careerImg from "../../assets/career.png";
import entertainmentImg from "../../assets/entertainment.png";
import securityImg from "../../assets/security-2.png";

const items: GuestCarouselItemData[] =  [
    {id:0, title: "Finance", image:  financeImg, paragraphs: ["Get insight into your finances"]},
    {id:1, title: "Career", image: careerImg, paragraphs: ["Provides metrics and assistance for your career"]},
    {id:2, title: "Entertainment", image: entertainmentImg, paragraphs: ["Get ideas for more activites"]},
    {id:3, title: "Security", image: securityImg, paragraphs: ["Protect your data"]}
]

export const GuestPage = () => {
    return (
        <section
            id={styles.guest}
        >  
            <GuestWelcome />
            <GuestItemCarousel items={items}/>
            <GuestMission />
            <GuestTestimonials />
        </section> 
    );
}