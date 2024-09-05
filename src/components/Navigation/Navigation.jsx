import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

export default function Navigation() {
    return (
        <nav className={css.nav}>
            <NavLink to="/" className={css.link} activeClassName={css.active}>
                Home
            </NavLink>
            <NavLink to="/movies" className={css.link} activeClassName={css.active}>
                Movies
            </NavLink>
        </nav>
    );
}
