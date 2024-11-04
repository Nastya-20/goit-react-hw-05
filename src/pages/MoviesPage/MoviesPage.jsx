import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import { useTranslation } from 'react-i18next';
import css from '../MoviesPage/MoviesPage.module.css';

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [warning, setWarning] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const { t } = useTranslation();
    
    const query = searchParams.get('query') || '';

    useEffect(() => {
        const savedMovies = localStorage.getItem('movies');
        if (savedMovies) {
            setMovies(JSON.parse(savedMovies));
        }
    }, []);

    useEffect(() => {
        if (movies.length > 0) {
            localStorage.setItem('movies', JSON.stringify(movies));
        }
    }, [movies]);

    useEffect(() => {
        if (query) {
            handleSearch(query);
        }
    }, [query]);

    const handleSearch = async (searchQuery) => {
        if (searchQuery.trim() === '') {
            setWarning('Please enter a search term.');
            setMovies([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        setWarning('');

        try {
            const results = await searchMovies(searchQuery);

            if (results.length === 0) {
                setWarning('No movies found for your search.');
            }

            setMovies(results);
        } catch (err) {
            setError('Failed to fetch movies. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchParams({ query: value }); 

        if (warning || error) {
            setWarning('');
            setError(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            handleSearch(query);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className={css.input}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder={t('search_for_movies')}
                />
                <button className={css.btn} type="submit">
                    {isLoading ? 'Searching...' : t('Search')}
                </button>
            </form>
            {warning && <div className={css.warning}>{warning}</div>}
            {isLoading && <div className={css.loader}>Loading...</div>}
            {error && <div className={css.error}>{error}</div>}
            {!isLoading && !error && !warning && <MovieList movies={movies} />}
        </div>
    );
}






