import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx'; 
import { useTranslation } from 'react-i18next';
import css from './Navigation.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
    const { t } = useTranslation();
    return (
        <header>
        <nav className={css.nav}>
            <NavLink to="/" className={buildLinkClass}>
              {t('home')}
            </NavLink>
            <NavLink to="/movies" className={buildLinkClass}>
                {t('movies')}
            </NavLink>
            </nav>
        </header>
    );
}
