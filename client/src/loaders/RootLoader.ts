import { redirect } from "react-router-dom";

export const rootLoader = () => {
    if (localStorage.getItem('token') !== null) {
        return redirect("/dashboard");
    }
    return null;
}