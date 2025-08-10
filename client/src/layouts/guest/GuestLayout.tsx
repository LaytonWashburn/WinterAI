import { Navbar } from "../../components/nav-bar/Navbar"
import { Outlet } from "react-router-dom"
import styles from "./GuestLayout.module.css"


export const GuestLayout = () => {
    return (
        <>
            <Navbar />
            <main id={styles.main}>
                <Outlet />
            </main>
        </>
    )

}