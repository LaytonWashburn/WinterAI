import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchResults } from './SearchResults';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';  // get ?query= from URL
  const apiUrl = import.meta.env.VITE_API_URL;
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setSearchResults(null);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Querying", query);
        const response = await fetch(`${apiUrl}/v1/search/searxng`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query
                }),
            });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Here is the data: ", data);
        setSearchResults(data.results); // adjust based on your API shape
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (isLoading) return <div>Loading search results...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!query) return <div>Start searching to see results.</div>;
  if (searchResults?.length === 0) return <div>No results found for "{query}".</div>;

    return (
    <>
        {searchResults ? (
        <div>
            <SearchResults results={searchResults} query={query} />
        </div>
        ) : (
        <div>Test</div>
        )}
    </>
    );

};