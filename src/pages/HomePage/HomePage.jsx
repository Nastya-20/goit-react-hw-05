import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

 const { t, i18n } = useTranslation();

 useEffect(() => {
        setIsLoading(true); 
        setError(null); 
        getTrendingMovies(i18n.language)
            .then(setMovies)
            .catch((error) => setError(error.message)) 
            .finally(() => setIsLoading(false)); 
    }, [i18n.language]);

    if (isLoading) {
        return <div className={css.loader}>Loading...</div>; 
    }

    if (error) {
        return <div className={css.error}>Error: {error}</div>; 
    }

    return (
        <div>
            <h1 className={css.title}>{t('trending_today')}</h1>
            <MovieList movies={movies} />
        </div>
    );
}
