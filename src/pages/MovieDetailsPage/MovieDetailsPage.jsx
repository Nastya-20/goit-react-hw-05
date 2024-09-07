import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../../movies-api';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import css from '../MovieDetailsPage/MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const backLinkLocationRef = useRef(location.state?.from || '/movies');

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const movieData = await getMovieDetails(movieId);
                setMovie(movieData);
            } catch (err) {
                setError('Failed to load movie details.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    const handleGoBack = () => {
        navigate(backLinkLocationRef.current); 
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className={css.error}>{error}</div>;
    if (!movie) return null;

    const genres = movie.genres.map(genre => genre.name).join(', ');
    const countries = movie.production_countries.map(country => country.name).join(', ');

    return (
        <div>
           <button className={css.back} onClick={handleGoBack}>Go back</button>
            <div className={css.container}>
              <img className={css.poster}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
            <div className={css.cardContainer}>
                <h1 className={css.title}>{movie.title}</h1>
                <p className={css.overview}>{movie.overview}</p>
                <ul className={css.details}>
                    <li><strong>Release Date:</strong> {movie.release_date}</li>
                    <li><strong>Country:</strong> {countries}</li>
                    <li><strong>Genre:</strong> {genres}</li>
                    <li><strong>User Score:</strong> {movie.vote_average.toFixed(1)}</li>
                </ul>
                </div>
            </div>
            <h3>Additional information:</h3>
            <nav className={css.wrapper}>
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


