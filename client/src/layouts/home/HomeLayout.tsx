import { Outlet } from 'react-router-dom';
import  { Navbar } from '../../components/nav-bar/Navbar';
import "./HomeLayout.css";

export const HomeLayout = () => {
  return (
      <>
        <Navbar />
        <div id="outlet-wrapper">
          <Outlet />
        </div>
        {/* <footer className="flex flex-center-all margin-top-16">
            <span className="text-muted">© 2023 Winter AI</span>
        </footer> */}
      </>
  );
}   