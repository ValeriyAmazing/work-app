// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Для навигации
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav>
                <Link to="/" className={styles.link}>Главная</Link>
                <Link to="/students" className={styles.link}>Список учеников</Link>
            </nav>
        </header>
    );
};

export default Header;