import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

 useEffect(() => {
        setIsLoading(true); 
        setError(null); 
        getTrendingMovies()
            .then(setMovies)
            .catch((error) => setError(error.message)) 
            .finally(() => setIsLoading(false)); 
    }, []);

    if (isLoading) {
        return <div className={css.loader}>Loading...</div>; 
    }

    if (error) {
        return <div className={css.error}>Error: {error}</div>; 
    }

    return (
        <div>
            <h1 className={css.title}>Trending today</h1>
            <MovieList movies={movies} />
        </div>
    );
}
