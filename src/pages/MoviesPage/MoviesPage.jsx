import React, { useState, useEffect } from 'react';
import { searchMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import css from '../MoviesPage/MoviesPage.module.css';

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [warning, setWarning] = useState('');

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

    const handleSearch = async (e) => {
        e.preventDefault();

        if (query.trim() === '') {
            setWarning('Please enter a search term.');
            setMovies([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        setWarning('');

        try {
            const results = await searchMovies(query);

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
        setQuery(e.target.value);

        if (warning || error) {
            setWarning('');
            setError(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    className={css.input}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for movies..."
                />
                <button className={css.btn} type="submit">
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>
            {warning && <div className={css.warning}>{warning}</div>}
            {isLoading && <div className={css.loader}>Loading...</div>}
            {error && <div className={css.error}>{error}</div>}
            {!isLoading && !error && !warning && <MovieList movies={movies} />}
        </div>
    );
}





