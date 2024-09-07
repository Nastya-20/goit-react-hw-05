import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../movies-api';
import css from '../MovieReviews/MovieReviews.module.css';

export default function MovieReviews() {
    const { movieId } = useParams();  
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const fetchedReviews = await getMovieReviews(movieId);
                setReviews(fetchedReviews);
                setError(null); 
            } catch (err) {
                setError('Failed to fetch reviews. Please try again later.');
                setReviews([]); 
            }
        };

        fetchReviews();
    }, [movieId]);

    return (
        <div>
            {error && <p className={css.error}>{error}</p>}
            <ul className={css.containerReviews}>
                {reviews.length ? (
                    reviews.map((review) => (
                        <li className={css.reviewsItem} key={review.id}>
                            <p className={css.autor}><strong>Name: </strong>{review.author}</p>
                            <p className={css.reviews}><strong>Review: </strong>{review.content}</p>
                        </li>
                    ))
                ) : !error && <p className={css.noReviews}>No reviews available.</p>}
            </ul>
        </div>
    );
}


