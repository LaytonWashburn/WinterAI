import { Navbar } from "../components/navbar/Navbar"
import { Outlet } from "react-router-dom"


export const GuestLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            {/* <footer className="flex flex-center-all margin-top-16">
                <span className="text-muted">© 2023 Winter AI</span>
            </footer> */}
        </>
    )

}