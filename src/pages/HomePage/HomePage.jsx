import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getTrendingMovies().then(setMovies);
    }, []);

    return <MovieList movies={movies} />;
}
