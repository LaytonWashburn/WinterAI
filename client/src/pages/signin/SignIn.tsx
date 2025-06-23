import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../../context/AuthContext';

import "./SignIn.css"


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

        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/token`, {
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
        <form action="" id="main" onSubmit={(e)=>{signin(e)}}>
            <div id="main-container">
                <span>Sign In Page</span>
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    value={username}
                    name="username" 
                    onChange={(e) => {setUsername(e.target.value)}}
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    value={password} 
                    name="password" 
                    onChange={(e) => {setPassword(e.target.value)}}
                 />
                <button id="submit-button" >Sign In</button>
            </div>
        </form>
    )
}