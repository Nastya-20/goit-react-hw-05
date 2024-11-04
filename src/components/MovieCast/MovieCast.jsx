import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../movies-api';
import css from './MovieCast.module.css'; 

export default function MovieCast() {
    const { movieId } = useParams();  
    const [cast, setCast] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const castData = await getMovieCast(movieId);
                setCast(castData);
            } catch (err) {
                setError('Failed to load cast. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCast();
    }, [movieId]);

    if (isLoading) {
        return <div className={css.loader}>Loading...</div>;
    }

    if (error) {
        return <div className={css.error}>{error}</div>; 
    }

    const defaultImg = '../../../public/dog-2367414_640.jpg';

    return (
        <ul className={css.castList}>
            {cast.length > 0 ? (
                cast.map((actor) => (
                    <li key={actor.cast_id} className={css.castItem}>
                        {actor.profile_path ? (
                            <img
                                className={css.photo}
                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
                                alt={actor.name}
                            />
                        ) : (
                            <img 
                                className={css.photo} 
                                src={defaultImg} 
                                alt="Default actor image" 
                                width={250}
                            />
                        )}
                        <p className={css.role}>{actor.name} as {actor.character}</p>
                    </li>
                ))
            ) : (
                <div className={css.noCast}>No cast information available.</div> 
            )}
        </ul>
    );
}

