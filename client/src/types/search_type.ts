// types.ts

export interface SearchResult {
    url: string;
    title: string;
    content: string;
    thumbnail: string | null;
    engine: string;
    // ... many other properties from the JSON
    positions: number[];
    score: number;
    category: string;
    publishedDate: string | null;
}

export interface SearchResponse {
    results: {
        query: string;
        number_of_results: number;
        results: SearchResult[];
    };
}