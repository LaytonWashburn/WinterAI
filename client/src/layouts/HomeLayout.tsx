import { Outlet } from 'react-router-dom';
import  { Navbar } from '../components/navbar/Navbar';

export const HomeLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet/>
        {/* <footer className="flex flex-center-all margin-top-16">
            <span className="text-muted">© 2023 Winter AI</span>
        </footer> */}
    </>
  );
}   