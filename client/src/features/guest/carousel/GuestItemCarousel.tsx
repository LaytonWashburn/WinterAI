import { useState } from "react";
import { GuestItem } from "../item/GuestItem"
import type { GuestCarouselItemData } from "../../../types/guestCarouselType"
import styles from "./GuestItemCarousel.module.css";

interface GuestItemCarouselProps {
    items: GuestCarouselItemData[]
}

export const GuestItemCarousel = ({ items }: GuestItemCarouselProps) => {

    const [curItem, setCurItem] = useState<number>(0);

    const forwardCallback = () => {
        if (curItem === items.length - 1) {
            setCurItem(0);
        } else {
            setCurItem(curItem + 1);
        }
    };

    const backwardCallback = () => {
        if (curItem === 0) {
            setCurItem(items.length - 1);
        } else {
            setCurItem(curItem - 1);
        }
    };


    return (
        <>
            <div className={`${styles.section}`}>
                <GuestItem
                    title={items[curItem].title}
                    paragraphs={items[curItem].paragraphs}
                    image={items[curItem].image}
                    id={items[curItem].id}
                    item={curItem}
                    backwardCallback={backwardCallback}
                    forwardCallback={forwardCallback}
                />
            </div>
        </>
    )
}