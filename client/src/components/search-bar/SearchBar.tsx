// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import style from './SearchBar.module.css';

// export const SearchBar = () => {
//     const navigate = useNavigate();
//     const [query, setQuery] = useState("");

//     const handleChange = (e) => {
//         setQuery(e.target.value);
//     };



//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (query.trim() === "") return;
//         console.log(`Searching for ${query}`);
//         // Navigate to the search page, passing the query in the URL
//         navigate(`/search?query=${encodeURIComponent(query)}`);
//     };

//     return (
//         <div id={style.search_bar}>
//             <form onSubmit={handleSubmit} className={style.search_bar_inner}>
//                 <div className={style.search_left}>Search</div>
//                 <input
//                     className={style.search_input}
//                     onChange={handleChange}
//                     value={query}
//                     placeholder="Explore the web ..."
//                     type="text"
//                 />
//                 <button type="submit" style={{ display: 'none' }}></button> {/* The hidden submit button */}
//                 <div 
//                     className={`${style.search_right} material-symbols-outlined`}
//                     onClick={handleSubmit} // Added a click handler for the icon
//                 >
//                     search
//                 </div>
//             </form>
//         </div>
//     );
// };
// components/SearchBar.jsx

// components/SearchBar.jsx

// import React from 'react';
// import { useSearch } from '../../hooks/useSearch';
// import style from './SearchBar.module.css';

// export const SearchBar = () => {
//     const { query, setQuery, setSubmittedQuery } = useSearch();

//     const handleChange = (e) => {
//         setQuery(e.target.value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // This is the key change: update the submittedQuery state to trigger the search
//         setSubmittedQuery(query);
//     };

//     return (
//         <div id={style.search_bar}>
//             <form onSubmit={handleSubmit} className={style.search_bar_inner}>
//                 <div className={style.search_left}>Search</div>
//                 <input
//                     className={style.search_input}
//                     onChange={handleChange}
//                     value={query}
//                     placeholder="Explore the web ..."
//                     type="text"
//                 />
//                 <button type="submit" style={{ display: 'none' }}></button>
//                 <div className={`${style.search_right} material-symbols-outlined`}>
//                     search
//                 </div>
//             </form>
//         </div>
//     );
// };

import React from 'react';
import { useSearch } from '../../hooks/useSearch';
import { useNavigate } from 'react-router-dom';
import style from './SearchBar.module.css';

export const SearchBar = () => {
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  if (query.trim()) {
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  }
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
        <button type="submit" style={{ display: 'none' }}></button>
        <div className={`${style.search_right} material-symbols-outlined`}>
          search
        </div>
      </form>
    </div>
  );
};
