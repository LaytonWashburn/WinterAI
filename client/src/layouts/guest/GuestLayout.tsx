import { Navbar } from "../../components/nav-bar/Navbar"
import { Outlet } from "react-router-dom"


export const GuestLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )

}