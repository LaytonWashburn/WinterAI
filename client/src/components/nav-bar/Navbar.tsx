import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // <-- make sure this exists
import { NavDrawer } from '../nav-drawer/NavDrawer';
import { SearchBar } from '../search-bar/SearchBar';
import { TabBar } from '../tab-bar/TabBar';
import styles from './Navbar.module.css';
import "../../css/material-symbol-outline.css";


interface NavbarProps {
  isGuest?: boolean;
}

export const Navbar = ({ isGuest = false }: NavbarProps) => {
    const { isAuthenticated, logout, user, token } = useAuth();
    const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
    const [isNavdrawerOpen, setIsNavdrawerOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        if (!isGuest) {
            setIsScrolled(true); // Always use white for non-guest
            return;
        }
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isGuest]);

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
            // Get response as a Blob, not JSON
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
    }, [isAuthenticated, user, token]); 


    return (
        <nav className={`${styles.navbar} ${styles.shadowUnderneath} ${isScrolled ? styles.scrolled : (isGuest ? styles.notScrolled : '')}`}> 

            {isAuthenticated && <TabBar />}
            {
                isAuthenticated && <NavDrawer 
                isOpen={isNavdrawerOpen} 
                callCallback={() => setIsNavdrawerOpen(false)}
           />
            }
           <div id={styles.leftNavSection} className="">
            { isAuthenticated && 
                <button
                    id={styles.menuButton} 
                    className="material-symbols-outlined"
                    onClick={() => setIsNavdrawerOpen(true)}
                >
                    menu
                </button>
                
        }
            {/* <Link className="underline-none margin-left-8 margin-right-8 link-pic">
                <img src={character} alt="Character" className="image-cover-fit link-pic" />
            </Link> */}
            <Link id={styles.logoLink} className={styles.linkContainer}>Winter AI</Link>
           </div>
           {
            isAuthenticated &&
            <SearchBar />
           }
           <div id={styles.rightNavSection } className="">
                {
                    !isAuthenticated && (
                        <>
                            <Link 
                                className={`${styles.linkContainer} ${styles.rightLink}`} 
                                to={'/signup/'}
                            >
                                Sign Up
                            </Link>
                            <Link 
                                className={`${styles.linkContainer} ${styles.rightLink}`} 
                                to={"/signin/"}
                            >
                                Sign In
                            </Link> 
                        </>
                    )
                    
                }
                
                {
                isAuthenticated && 
                <Link 
                    className={`${styles.linkContainer} ${styles.rightLink}`} 
                    onClick={() => logout()}>
                    Log Out
                </Link>
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