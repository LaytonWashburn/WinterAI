// components/SearchResults.tsx

import React from 'react';
import type { SearchResult as SearchResultType } from '../../types/search_type';
import { SearchResult } from './SearchResult';
import styles from './SearchResults.module.css'; // Assuming you have a CSS module

interface SearchResultsProps {
    results: SearchResultType[];
    query: string;
}

export const SearchResults = ({ results, query}: SearchResultsProps) => {

    return (
        <section id={styles.searchResults}>
            {
                results.results.map(result => (
                    <SearchResult result={result} />
                ))
            }
        </section>
    );
};