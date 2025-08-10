// import { React, useState } from "react"
// import { Link, useNavigate } from 'react-router-dom';
// import style from './SearchBar.module.css';

// export const SearchBar = () => {

//     const navigate = useNavigate();
//     const apiUrl = import.meta.env.VITE_API_URL;
//     const [query, setQuery] = useState("");



//     const navigateToSearch = () => {
//         navigate("/search");
//     }

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       setQuery(e.target.value);
//     };

//     const submitSearch = async () => {

//       console.log(`Submitting query: ${query}`)
//       setQuery("");
//       const response = await fetch(`${apiUrl}/v1/search/query`, {
//           method: 'POST',
//           headers: {
//           'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             query: query
//           }),
//       });
//       const data = await response.json();
//       console.log("Here is the data from the search");
//       console.log(data);
      
//     }

//   return (
//     <div id={style.search_bar}>
//       <div className={style.search_bar_inner}>
//         <div className={style.search_left}>Search</div>
//         <input
//             className={style.search_input}
//             onChange={(e) => handleChange(e)}
//             onClick={()=>{
//               navigateToSearch();
//               submitSearch();
//             }}
//             placeholder="Explore the web ..."
//             type="text"
//         />
//         <div className={`${style.search_right} material-symbols-outlined`}>
//             search
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import style from './SearchBar.module.css';

export const SearchBar = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const submitSearch = async () => {
        console.log(`Submitting query: ${query}`);
        try {
            const response = await fetch(`${apiUrl}/v1/search/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query
                }),
            });
            const data = await response.json();
            console.log("Here is the data from the search");
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch search results:", error);
        }
        setQuery("");
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the page from refreshing
        if (query.trim() === "") {
            console.log("Query is empty, not submitting.");
            return;
        }
        submitSearch();
    };

    return (
        <div id={style.search_bar}>
            <form onSubmit={handleSubmit} className={style.search_bar_inner}>
                <div className={style.search_left}>Search</div>
                <input
                    className={style.search_input}
                    onChange={handleChange}
                    value={query}
                    placeholder="Explore the web ..."
                    type="text"
                />
                <div 
                    className={`${style.search_right} material-symbols-outlined`}
                    onClick={handleSubmit} // Added a click handler for the icon
                >
                    search
                </div>
            </form>
        </div>
    );
};