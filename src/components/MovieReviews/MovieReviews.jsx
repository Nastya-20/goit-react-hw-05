import React, { useEffect, useState } from 'react';
import { getMovieReviews } from '../../movies-api';

export default function MovieReviews({ movieId }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getMovieReviews(movieId).then(setReviews);
    }, [movieId]);

    return (
        <ul>
            {reviews.length ? reviews.map((review) => (
                <li key={review.id}>
                    <p><strong>{review.author}</strong></p>
                    <p>{review.content}</p>
                </li>
            )) : <p>No reviews available.</p>}
        </ul>
    );
}
