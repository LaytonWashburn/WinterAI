import {  React, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../../context/AuthContext';

import "../../css/flex.css";
import "../../css/margin.css";
import "../../css/background.css";
import "../../css/text.css";
import "../../css/image.css";
import "../../css/height.css";
import "../../css/width.css";
import "../../css/material-symbol-outline.css"
import "./SignUp.css";

import winter from "../../../public/winter.png";



export const SignUp = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profilePictureURL, setProfilePictureURL] = useState("");
    const [file, setFile] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        full_name: "",
        date_of_birth: "",
        email: "",
        profile_picture: ""
    });

    const uploadProfilePicture = async (file:any) => {
            const formData = new FormData();
            formData.append("file", file); // "file" should match what your FastAPI expects
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile/upload`, {
                method: 'POST',
                // headers: {
                // 'Content-Type': 'application/json'
                // },
                body: formData,
            })
            const data = await response.json();
            console.log("Here is the data from the profile picture");
            console.log(data);
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("File selected:", file);
            setProfilePictureURL(URL.createObjectURL(file));
            setFile(file);
            
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submitted");

        const payload = {
            ...formData,
            full_name: `${formData.first_name} ${formData.last_name}`.trim(),
            profile_picture: file.name
        };
        console.log("Form data:", payload);
        uploadProfilePicture(file);
        const response = await fetch(`${apiUrl}/user/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
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

        type Field = keyof typeof formData;
        const fields: [Field, string, string?][] = [
            ["first_name", "First Name"],
            ["last_name", "Last Name"],
            ["username", "Username"],
            ["email", "Email", "email"],
            ["password", "Password", "password"],
            ["date_of_birth", "Date of Birth", "date"],
            ];
    return (
        <form id="signup" className="flex flex-column flex-center-all" onSubmit={handleSubmit}>


            <div id="container" className="flex flex-column flex-center-all margin-top-16 margin-bottom-16 width-50-percent">

                <h1 className="text-2xl">Sign Up</h1>
                <div className="flex flex-column items-center gap-4">
                {/* Profile Picture Preview */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    border: "2px dashed #ccc",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    overflow: "hidden",
                    position: "relative",
                    }}
                >
                    {profilePictureURL ? (
                    <img
                        src={profilePictureURL}
                        alt="Profile Preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    ) : (
                    <span className="material-symbols-outlined" style={{ fontSize: "32px", color: "#888" }}>
                        add
                    </span>
                    )}
                </div>

                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                />
                
            </div>

            <div className="margin-16">
                {fields.map(([name, label, type = "text"]) => (
                    <div
                        key={name}
                        className="margin-top-8 margin-bottom-16"
                        style={{ display: "flex", flexDirection: "column", justifyContent:"start" }}
                    >
                        <label
                        htmlFor={name}
                        className="text-lg"
                        style={{ marginBottom: "4px", fontWeight: "500", color: "#333" }}
                        >
                        {label}
                        </label>
                        <input
                        type={type}
                        id={name}
                        name={name}
                        required={["username", "password", "email"].includes(name)}
                        value={formData[name]}
                        onChange={handleChange}
                        style={{
                            padding: "10px 12px 10px 12px",
                            margin: "4px",
                            fontSize: "16px",
                            borderRadius: "8px",
                            border: "1px solid rgba(0, 0, 0, 0.2)",
                            outlineColor: "#4CAF50",
                            transition: "border-color 0.2s ease-in-out",
                        }}
                        />
                    </div>
                    ))}
            </div>
                <button 
                    type="submit" 
                    id="create-account-button"
                    className="button-primary">
                        Create Account
                </button>

            </div>


        </form>
    );
}