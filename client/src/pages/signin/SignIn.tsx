import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../../context/AuthContext';

import styles from "./SignIn.module.css";


export const SignIn = () => {

    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signin = async (e:React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(username);
        // --- FORMATTING THE REQUEST BODY ---
        const credentialsPayload = {
            username: username,
            plain_text_password: password,
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/login`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
             // For OAuth2PasswordRequestForm, send as URL-encoded string
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,

        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {  
            console.log("Sign up successful:", data);
            // Optionally redirect or show a success message
        } else {
            console.error("Sign up failed:", data);
            // Optionally show an error message
        }


        // Use the login function from AuthContext
        login(data.access_token, data.user); // Store the token and user data
        
        // Redirect to a protected route (e.g., dashboard)
        navigate('/dashboard'); // Use React Router's navigate for client-side routing
    }


    return(
        <form action="" id={styles.main} onSubmit={(e)=>{signin(e)}}>
           
            <div id={styles.mainContainer}>
                 <span id={styles.title}>Sign In</span>
                <input 
                    type="text" 
                    value={username}
                    name="username" 
                    placeholder="Username"
                    id={styles.usernameInput}
                    onChange={(e) => {setUsername(e.target.value)}}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password} 
                    name="password" 
                    id={styles.passwordInput}
                    onChange={(e) => {setPassword(e.target.value)}}
                 />
                <button id={styles.submitButton} >Sign In</button>
            </div>
        </form>
    )
}