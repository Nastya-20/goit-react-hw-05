import React, { useEffect, useState } from 'react';
import { useParams, Link, Routes, Route, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../../movies-api';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getMovieDetails(movieId).then(setMovie);
    }, [movieId]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (!movie) return null;

    return (
        <div>
            <button onClick={handleGoBack}>Go back</button>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <nav>
                <Link to="cast">Cast</Link>
                <Link to="reviews">Reviews</Link>
            </nav>

            <Routes>
                <Route path="cast" element={<MovieCast movieId={movieId} />} />
                <Route path="reviews" element={<MovieReviews movieId={movieId} />} />
            </Routes>
        </div>
    );
}
