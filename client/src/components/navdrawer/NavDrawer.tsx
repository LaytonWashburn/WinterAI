import styles from './NavDrawer.module.css';
import { Link } from 'react-router-dom';

const navItems = [
  // Example items; replace with your actual nav items
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/services', label: 'Services', icon: 'box' },
  { href: '/careers', label: 'Careers', icon: 'work' },
  { href: '/about', label: 'About', icon: 'info'},
  { href: '/profile', label: 'Profile', icon: 'account_circle' },
  { href: '/settings', label: 'Settings', icon: 'settings' },
];

interface NavDrawerProps {
  isOpen: boolean;
  callCallback: () => void;
}

export const NavDrawer = ({ isOpen, callCallback }: NavDrawerProps) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={callCallback}
      />

      {/* Drawer */}
      <nav className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`} aria-hidden={!isOpen}>
        <div className={styles.header}>
          <h1 className={styles.title}>Menu</h1>
          <span
            className={`${styles.close} material-symbols-outlined`}
            onClick={callCallback}
            role="button"
            aria-label="Close menu"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') callCallback(); }}
          >
            close
          </span>
        </div>

        <div className={styles.navDrawerContainer}>
          {navItems.map((item) => (
            <div className={`${styles.navitem} ${styles.navDraweIconContainer}`} key={item.href}>
                <span 
                className={`material-symbols-outlined ${styles.icon}`}>
                {item.icon}
                </span>
                <Link to={item.href} className={styles.link} onClick={callCallback}>
                {item.label}
                </Link>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};