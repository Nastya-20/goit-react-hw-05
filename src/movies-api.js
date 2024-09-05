import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjAxYWVlNzY1YmIzZDQ3MjdjYTQyNWFmZWU2ZjQyZSIsIm5iZiI6MTcyNTUzNDMzNC40ODg5NzEsInN1YiI6IjY2ZDgyNzc4MWUwMzA1MTZjYTI5ZTQ5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Pg1bLARK9DUn-Q7UsDXJSuxzOC8f1aacDF8Q_yewA8'; // Replace with your API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const getTrendingMovies = async () => {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    });
    return response.data.results;
};

export const searchMovies = async (query) => {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { query, include_adult: false, language: 'en-US', page: 1 },
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    });
    return response.data.results;
};

export const getMovieDetails = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    });
    return response.data;
};

export const getMovieCast = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    });
    return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    });
    return response.data.results;
};



