// import { redirect } from "react-router-dom";

// export const rootLoader = () => {
//     if (localStorage.getItem('token') !== null) {
//         return redirect("/dashboard");
//     }
//     return null;
// }

// loaders/RootLoader.ts
import { redirect } from "react-router-dom";

// Define the type for the loader's arguments.
type RootLoaderArgs = {
    request: Request;
};

export const rootLoader = ({ request }: RootLoaderArgs) => {
    console.log("Here is the URL before: ", request);
    const url = new URL(request.url);
    console.log("Here is the URL: ", url);
    const isAuthenticated: boolean = localStorage.getItem('token') !== null;
    const isGuestPage: boolean = ['/', '/signin', '/signup'].includes(url.pathname);

    if (isAuthenticated && isGuestPage) {
        console.log("Navigating to the dashboard")
        return redirect("/dashboard");
    }

    return null;
};

