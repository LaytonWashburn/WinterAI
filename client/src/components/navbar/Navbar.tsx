import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../../css/flex.css";
import "../../css/margin.css";
import "../../css/background.css";
import "../../css/text.css";
import "../../css/image.css";
import "../../css/shadow.css";
import './Navbar.css';
import "../../css/link.css"
import character from '../../../public/character-t.png';
import { useAuth } from '../../context/AuthContext'; // <-- make sure this exists


export const Navbar = () => {

    const { isAuthenticated, logout, user, token } = useAuth(); // <-- pull from context
    const [profilePictureUrl, setProfilePictureUrl] = useState("");

    const fetchProfilePicture = async () => {

    if (user) {
        const url = `${import.meta.env.VITE_API_URL}/user/profile/picture?user_id=${user.id}`;
        console.log("Fetching the Profile Picture");
        console.log(user.id);
        console.log(user);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            // **** CRITICAL CHANGE HERE: Get response as a Blob, not JSON ****
            const imageBlob = await response.blob(); 
            console.log("Received image blob:", imageBlob);

            // Create a URL for the blob
            const imageUrl = URL.createObjectURL(imageBlob);
            setProfilePictureUrl(imageUrl);
            console.log("Set profile picture URL:", imageUrl);

        } else {
            // If the response is not OK, it might still be JSON for errors, or plain text
            let errorDetail = "Failed to fetch profile picture.";
            try {
                const errorData = await response.json(); // Try to parse as JSON for error messages
                errorDetail = errorData.detail || errorDetail;
            } catch (e) {
                // If it's not JSON, maybe just read as text
                errorDetail = await response.text(); 
            }
            // setPictureError(errorDetail);
            console.error("Failed to fetch profile picture:", response.status, errorDetail);
            setProfilePictureUrl(null); // Fallback to default on error
        }
    }

    }

    useEffect(() => {
        // This useEffect will run when `isAuthenticated` or `user` or `token` changes.
        // This means it will trigger on login, logout, and initial load if authenticated.
        fetchProfilePicture();

        // Cleanup function (optional but good practice if you had
        // event listeners or subscriptions)
        return () => {
            // Any cleanup if necessary when component unmounts or dependencies change
        };
    }, [isAuthenticated, user, token]); // <--- CRITICAL: Dependency array


    return (
        <nav id="navbar" className="flex flex-row flex-space-between shadow-underneath position-fixed">   
           <div className="flex flex-center-all margin-left-8">
            <Link className="underline-none margin-left-8 margin-right-8 link-pic">
                <img src={character} alt="Character" className="image-cover-fit link-pic" />
            </Link>
            <Link className="underline-none margin-left-8 margin-right-8 link">Winter AI</Link>
            <Link className="underline-none margin-left-8 margin-right-8 link">Products</Link>
            <Link className="underline-none margin-left-8 margin-right-8 link">Careers</Link>
            <Link className="underline-none margin-left-8 margin-right-8 link">About</Link>
           </div>
           <div className="flex flex-center-all margin-right-8">
                {
                    !isAuthenticated && (
                        <>
                            <Link className="underline-none margin-left-8 margin-right-8 link" to={'/signup/'}>Sign Up</Link>
                            <Link className="underline-none margin-left-8 margin-right-8 link" to={"/signin/"}>Sign In</Link> 
                        </>
                    )
                    
                }
                
                {
                isAuthenticated && 
                <Link className="underline-none margin-left-8 margin-right-8 link" onClick={() => logout()}>Log Out</Link>
                } 
                <Link className="underline-none margin-left-8 margin-right-8">
                    <img 
                        src={profilePictureUrl ? profilePictureUrl : character} 
                        alt="Character" 
                        id="profile-pic"
                        className="image-cover-fit link-pic" 
                    />
                </Link>
           </div>
        </nav>
    )
}