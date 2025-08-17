
import { Navbar } from "../../components/nav-bar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { FooterInfo } from "../../components/footer-info/FooterInfo";
import styles from "./GuestLayout.module.css";


export const GuestLayout = () => {
    const location = useLocation();
    // Only use gradient on landing page ("/" or whatever your landing route is)
    const isGuestLanding = location.pathname === "/";
    return (
        <>
            <div
                className={styles.mainWrapper}
            >
                <Navbar isGuest={isGuestLanding} />
                <main id={styles.main}>
                    <Outlet />
                </main>
            </div>
            <FooterInfo />
        </>
    );
}