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
  { id: 6, href: "/profile", label: "Profile", icon: "account_circle", requiresAuth: true },
  { id: 7, href: "/settings", label: "Settings", icon: "settings", requiresAuth: true },
];

export const NavDrawer = ({ isOpen, callCallback }: NavDrawerProps) => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    callCallback();
  };

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
            .filter(item => !item.requiresAuth || isAuthenticated)
            .map(item => (
              <div className={`${styles.navitem} ${styles.navDraweIconContainer}`} key={item.id}>
                <NavDrawerCommonLink {...item} callCallback={callCallback} />
              </div>
            ))
          }
          {isAuthenticated && (
            <div className={`${styles.navitem} ${styles.navDraweIconContainer}`}>
              <span className={`material-symbols-outlined ${styles.icon}`}>logout</span>
              <button className={styles.link} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};



// import styles from './NavDrawer.module.css';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';


// interface NavDrawerCommonLinkProps {
//   href: string;
//   label: string;
//   icon: string;
//   callCallback: () => void;
// }

// const NavDrawerCommonLink = ({href, label, icon, callCallback}: NavDrawerCommonLinkProps) =>{
//   return (
//     <>
//       <span 
//       className={`material-symbols-outlined ${styles.icon}`}>
//         {icon}
//       </span>
//       <Link to={href} className={styles.link} onClick={callCallback}>
//         {label}
//       </Link>
//     </>
//   )
// }




// interface NavDrawerProps {
//   isOpen: boolean;
//   callCallback: () => void;
// }

// export const NavDrawer = ({ isOpen, callCallback }: NavDrawerProps) => {
//   const { logout } = useAuth();
//   const navItems = [
//   // Example items; replace with your actual nav items
//   <NavDrawerCommonLink href="/dashboard" label="Dashboard" icon="dashboard" callCallback={() => {}} />,
//   <NavDrawerCommonLink href="/projects" label="Projects" icon="folder" callCallback={() => {}} />,
//   <NavDrawerCommonLink href="/services" label="Services" icon="box" callCallback={() => {}} />,
//   <NavDrawerCommonLink href="/careers" label="Careers" icon="work" callCallback={() => {}} />,
//   <NavDrawerCommonLink href="/about" label="About" icon="info" callCallback={() => {}} />,
//   <NavDrawerCommonLink href="/profile" label="Profile" icon="account_circle" callCallback={() => {}} />,
//   <NavDrawerCommonLink href="/settings" label="Settings" icon="settings" callCallback={() => {}} />,
//   <NavDrawerCommonLink href="" label="Logout" icon="logout" callCallback={logout} />,
// ];
//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
//         onClick={callCallback}
//       />

//       {/* Drawer */}
//       <nav className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`} aria-hidden={!isOpen}>
//         <div className={styles.header}>
//           <h1 className={styles.title}>Menu</h1>
//           <span
//             className={`${styles.close} material-symbols-outlined`}
//             onClick={callCallback}
//             role="button"
//             aria-label="Close menu"
//             tabIndex={0}
//             onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') callCallback(); }}
//           >
//             close
//           </span>
//         </div>

//         <div className={styles.navDrawerContainer}>
//           {navItems.map((item) => (
//             item
//           ))}
//         </div>
//       </nav>
//     </>
//   );
// };