// SearchPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from "./Search.module.css";

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    const [searchResults, setSearchResults] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    // The useEffect hook runs whenever the 'query' in the URL changes
    useEffect(() => {
        const fetchResults = async () => {
            if (!query) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            
            try {
                // Call your API with the query from the URL
                const response = await fetch(`${apiUrl}/v1/search/query`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query: query }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setSearchResults(data);

            } catch (error) {
                setError(error);
                console.error("Failed to fetch search results:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();

    }, [query, apiUrl]); // The effect re-runs whenever the query or apiUrl changes

    if (isLoading) {
        return <div>Loading search results...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!searchResults) {
        return <div>Please enter a search query.</div>;
    }

    return (
        <div id={styles.search}>
            <h1>Search Results for: {query}</h1>
            <pre>{JSON.stringify(searchResults.answer.message, null, 2)}</pre>
        </div>
    );
};