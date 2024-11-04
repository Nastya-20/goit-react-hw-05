import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
    const location = useLocation();

    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={10} 
            slidesPerView={3} 
            navigation 
            breakpoints={{
                320: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5 }
            }}
            className={css.wrap}
        >
            {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                    <Link 
                        to={`/movies/${movie.id}`} 
                        state={{ from: location }}
                        className={css.link}
                    >
                        <img 
                            className={css.poster}
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <span>{movie.title}</span>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}



