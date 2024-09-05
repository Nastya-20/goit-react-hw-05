import React, { useEffect, useState } from 'react';
import { getMovieCast } from '../../movies-api';

export default function MovieCast({ movieId }) {
    const [cast, setCast] = useState([]);

    useEffect(() => {
        getMovieCast(movieId).then(setCast);
    }, [movieId]);

    return (
        <ul>
            {cast.map((actor) => (
                <li key={actor.cast_id}>{actor.name} as {actor.character}</li>
            ))}
        </ul>
    );
}
