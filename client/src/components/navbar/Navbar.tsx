import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css'; // <-- make sure this file exists
import "../../css/material-symbol-outline.css";
import character from '../../../public/character-t.png';
import box from '../../../public/box.png';
import { useAuth } from '../../context/AuthContext'; // <-- make sure this exists


export const Navbar = () => {

    const { isAuthenticated, logout, user, token } = useAuth(); // <-- pull from context
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    
    const [isMobile, setIsMobile] = useState(false);

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
        if (isAuthenticated) {
            fetchProfilePicture();
        }

        // Cleanup function (optional but good practice if you had
        // event listeners or subscriptions)
        return () => {
            // Any cleanup if necessary when component unmounts or dependencies change
        };
    }, [isAuthenticated, user, token]); // <--- CRITICAL: Dependency array


    return (
        <nav id={styles.navbar} className={`${styles.shadowUnderneath}`}>   
           <div id={styles.leftNavSection} className="">
            {/* <Link className="underline-none margin-left-8 margin-right-8 link-pic">
                <img src={character} alt="Character" className="image-cover-fit link-pic" />
            </Link> */}
            <Link className={styles.linkContainer}>Winter AI</Link>
            <Link className={styles.linkContainer}>Products</Link>
            <Link className={styles.linkContainer}>Careers</Link>
            <Link className={styles.linkContainer}>About</Link>
           </div>
           <div id={styles.rightNavSection } className="">
                {
                    !isAuthenticated && (
                        <>
                            <Link className={styles.linkContainer} to={'/signup/'}>Sign Up</Link>
                            <Link className={styles.linkContainer} to={"/signin/"}>Sign In</Link> 
                        </>
                    )
                    
                }
                
                {
                isAuthenticated && 
                <Link className={styles.linkContainer} onClick={() => logout()}>Log Out</Link>
                } 
                {/* <Link className="underline-none margin-left-8 margin-right-8" id="profile-link">
                    <img 
                        src={profilePictureUrl ? profilePictureUrl : box} 
                        alt="Character" 
                        id="profile-pic"
                        className="image-cover-fit link-pic" 
                    />
                </Link> */}
           </div>
        </nav>
    )
}