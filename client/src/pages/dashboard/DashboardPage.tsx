import { useAuth } from "../../context/AuthContext"

export const DashboardPage = () => {

    const {user} = useAuth();
    return (
        <main>
            Welcome to the Home Page { user.username } !
        </main>
    )
}