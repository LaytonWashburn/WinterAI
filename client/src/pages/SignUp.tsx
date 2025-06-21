import React from 'react';
import { useState } from 'react';

import "../css/flex.css";
import "../css/margin.css";
import "../css/background.css";
import "../css/text.css";

export const SignUp = () => {

    const apiUrl = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        full_name: "",
        date_of_birth: "",
        email: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submitted");
        console.log("Form data:", formData);
        
        const response = await fetch(`${apiUrl}/user/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {  
            console.log("Sign up successful:", data);
            // Optionally redirect or show a success message
        } else {
            console.error("Sign up failed:", data);
            // Optionally show an error message
        }
        

    }   


    return (
        <form className="flex flex-column flex-center-all flex-grow-1" onSubmit={handleSubmit}>
        <h1 className="text-2xl">Sign Up</h1>

        {[
            ["username", "Username"],
            ["password", "Password", "password"],
            ["first_name", "First Name"],
            ["last_name", "Last Name"],
            ["full_name", "Full Name"],
            ["date_of_birth", "Date of Birth", "date"],
            ["email", "Email", "email"],
        ].map(([name, label, type = "text"]) => (
            <div key={name} className="margin-top-8 margin-bottom-16">
            <label htmlFor={name} className="text-lg">{label}:</label>
            <input
                type={type}
                id={name}
                name={name}
                required={name === "username" || name === "password" || name === "email"}
                className="margin-top-8"
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
            />
            </div>
        ))}

        <button type="submit" className="button-primary">Sign Up</button>
        </form>
    );
}