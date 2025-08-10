import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { SearchResult as SearchResultType } from '../../types/search_type';
import styles from "./SearchResult.module.css";

interface SearchResultProp {
    result: SearchResultType
}

export const SearchResult = ({result}: SearchResultProp) => {

    const url = new URL(result.url);
    const faviconUrl = `${url.origin}/favicon.ico`;

    return (
        <section id={styles.result}>
            <div id={styles.container}>
                <div
                    id={styles.imageContainer}    
                >
                    <img 
                        src={faviconUrl} 
                        alt="favicon" 
                        width={36} 
                        height={36} 
                        onError={e => e.currentTarget.style.display = 'none'} 
                    />
                </div>
                <Link id={styles.title} to={result.url}>
                    {result.title}
                </Link>
            </div>
 
            <div id={styles.description}>{result.content}</div>
        </section>
    )
}