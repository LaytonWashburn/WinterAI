// src/components/bottom_navbar/BottomNavbar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './TabBar.module.css';

// Define your navigation items with icons and paths
const navItems = [
    { name: 'Home', icon: 'home', path: '/' },
    { name: 'Profile', icon: 'person', path: '/profile' },
    { name: 'Settings', icon: 'settings', path: '/settings' },
    // Add more items here
];

export const TabBar = () => {
    const location = useLocation();

    return (
        <nav id={styles.bottomNav}>
            {navItems.map((item) => (
                <Link
                    key={item.name}
                    to={item.path}
                    className={`${styles.navItem}`}
                >
                    <div className={styles.navItemContainer}>
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className={styles.navLabel}>{item.name}</span>
                    </div>
                </Link>
            ))}
        </nav>
    );
};