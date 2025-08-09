import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './NavDrawer.module.css';

// Component for rendering a single navigation link
interface NavDrawerCommonLinkProps {
  href: string;
  label: string;
  icon: string;
  callCallback: () => void;
}

const NavDrawerCommonLink = ({ href, label, icon, callCallback }: NavDrawerCommonLinkProps) => {
  return (
    <>
      <span className={`material-symbols-outlined ${styles.icon}`}>
        {icon}
      </span>
      <Link to={href} className={styles.link} onClick={callCallback}>
        {label}
      </Link>
    </>
  );
};

// Main NavDrawer component
interface NavDrawerProps {
  isOpen: boolean;
  callCallback: () => void;
}

// Data array for all navigation items
const navItemsData = [
  { id: 1, href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { id: 2, href: "/projects", label: "Projects", icon: "folder" },
  { id: 3, href: "/services", label: "Services", icon: "box" },
  { id: 4, href: "/careers", label: "Careers", icon: "work" },
  { id: 5, href: "/about", label: "About", icon: "info" },
  { id: 6, href: "/profile", label: "Profile", icon: "account_circle"},
  { id: 7, href: "/settings", label: "Settings", icon: "settings"}
];

export const NavDrawer = ({ isOpen, callCallback }: NavDrawerProps) => {

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={callCallback}
      />

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
          {navItemsData
            .map(item => (
              <div className={`${styles.navDraweItemContainer}`} key={item.id}>
                <NavDrawerCommonLink {...item} callCallback={callCallback} />
              </div>
            ))
          }
        </div>
      </nav>
    </>
  );
};