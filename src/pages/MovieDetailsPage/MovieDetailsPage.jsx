import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../../movies-api';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import { useTranslation } from 'react-i18next';
import css from '../MovieDetailsPage/MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const backLinkLocationRef = useRef(location.state?.from || '/movies');
     const { t } = useTranslation();

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
           <button className={css.back} onClick={handleGoBack}>{t('go_back')}</button>
            <div className={css.container}>
              <img className={css.poster}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
            <div className={css.cardContainer}>
                <h1 className={css.title}>{movie.title}</h1>
                <p className={css.overview}>{movie.overview}</p>
                <ul className={css.details}>
                    <li><strong>{t('release_date')}</strong> {movie.release_date}</li>
                    <li><strong>{t('country')}</strong> {countries}</li>
                    <li><strong>{t('genre')}</strong> {genres}</li>
                    <li><strong>{t('user_score')}</strong> {movie.vote_average.toFixed(1)}</li>
                </ul>
                </div>
            </div>
            <h3>{t('additional_information')}</h3>
            <nav className={css.wrapper}>
                <Link to="cast">{t('cast')}</Link>
                <Link to="reviews">{t('reviews')}</Link>
            </nav>

            <Routes>
                <Route path="cast" element={<MovieCast movieId={movieId} />} />
                <Route path="reviews" element={<MovieReviews movieId={movieId} />} />
            </Routes>
        </div>
    );
}


