import { Outlet } from 'react-router-dom';
import  { Navbar } from '../../components/nav-bar/Navbar';
import { FooterInfo } from '../../components/footer-info/FooterInfo';
import styles from "./HomeLayout.module.css";

export const HomeLayout = () => {
  return (
      <>
        <div
          className={styles.mainWrapper}
        >
          <Navbar isGuest={false} />
          <div id={styles.outletWrapper}>
            <Outlet />
          </div>
        </div>
        <FooterInfo needsBottomPixels={true} />
      </>
  );
}   