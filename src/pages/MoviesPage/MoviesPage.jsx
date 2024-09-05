import React, { useState } from 'react';
import { searchMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        const results = await searchMovies(query);
        setMovies(results);
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                />
                <button type="submit">Search</button>
            </form>
            <MovieList movies={movies} />
        </div>
    );
}
