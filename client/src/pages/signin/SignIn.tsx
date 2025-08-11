import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ErrorToast } from '../../components/error-toast/ErrorToast';
import  { useErrorToast } from '../../hooks/useErrorToast';
import styles from "./SignIn.module.css";

export const SignInPage = () => {
  const { login } = useAuth();
  const { showError, isVisible, message } = useErrorToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const signin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("In the login");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      });

      if (!response.ok) {
        // const errorData = await response.json();
        showError('Login Failed');
        // setErrorMessage(errorData.detail || 'Login failed');
        return;
      }

      const data = await response.json();
      console.log("After data", data);
      login(data.access_token, data.user);
      navigate('/dashboard');
    } catch (error) {
      showError('Login Failed');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id={styles.main} onSubmit={signin}>
      <div id={styles.mainContainer}>
        <span id={styles.title}>Sign In</span>
        <input
          type="text"
          value={username}
          name="username"
          placeholder="Username"
          id={styles.usernameInput}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          value={password}
          name="password"
          placeholder="Password"
          id={styles.passwordInput}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <button id={styles.submitButton} disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </div>
      {isVisible && <ErrorToast error_description={message} />}
    </form>
  );
};


// import { React, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { useAuth } from '../../context/AuthContext';
// import { ErrorToast } from '../../components/error-toast/ErrorToast';

// import styles from "./SignIn.module.css";


// export const SignInPage = () => {

//     const { login } = useAuth();
//     const navigate = useNavigate();
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState(false);

//     const signin = async (e:React.FormEvent<HTMLInputElement>) => {
//         e.preventDefault();
//         console.log(username);
//         // // --- FORMATTING THE REQUEST BODY ---
//         // const credentialsPayload = {
//         //     username: username,
//         //     plain_text_password: password,
//         // };

//         const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/login`, {
//             method: "POST",
//             headers: { 
//                 'Content-Type': 'application/x-www-form-urlencoded' 
//             },
//              // For OAuth2PasswordRequestForm, send as URL-encoded string
//             body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,

//         });

//         const data = await response.json();
//         console.log(data);
//         if (response.ok) {  
//             console.log("Sign up successful:", data);
//             // Optionally redirect or show a success message
//         } else {
//             console.error("Sign up failed:", data);
//             setErrorMessage(true);
//             setTimeout(() => {
//                 setErrorMessage(false);
//             }, 5000);
//             return;
//         }


//         // Use the login function from AuthContext
//         login(data.access_token, data.user); // Store the token and user data
        
//         // Redirect to a protected route (e.g., dashboard)
//         navigate('/dashboard'); // Use React Router's navigate for client-side routing
//     }


//     return(
//         <form action="" id={styles.main} onSubmit={(e)=>{signin(e)}}>
           
//             <div id={styles.mainContainer}>
//                  <span id={styles.title}>Sign In</span>
//                 <input 
//                     type="text" 
//                     value={username}
//                     name="username" 
//                     placeholder="Username"
//                     id={styles.usernameInput}
//                     onChange={(e) => {setUsername(e.target.value)}}
//                 />
//                 <input 
//                     type="password"
//                     placeholder="Password"
//                     value={password} 
//                     name="password" 
//                     id={styles.passwordInput}
//                     onChange={(e) => {setPassword(e.target.value)}}
//                  />
//                 <button id={styles.submitButton} >Sign In</button>
//             </div>
//             {
//                 errorMessage && <ErrorToast error_description='Login Failed' />
//             }
//         </form>
//     )
// }