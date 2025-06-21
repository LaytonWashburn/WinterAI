import { Link } from 'react-router-dom';
import "../../css/flex.css";
import "../../css/margin.css";
import "../../css/background.css";
import "../../css/text.css";
import "../../css/image.css";
import "../../css/shadow.css";
import './Navbar.css';
import "../../css/link.css"
import character from '../../../public/character-t.png';
import { useAuth } from '../../context/AuthContext'; // <-- make sure this exists


export const Navbar = () => {

    const { isAuthenticated } = useAuth(); // <-- pull from context


    return (
        <nav id="navbar" className="flex flex-row flex-space-between shadow-underneath">   
           <div className="flex flex-center-all margin-left-8">
            <Link className="underline-none margin-left-8 margin-right-8 link-pic">
                <img src={character} alt="Character" className="image-cover-fit link-pic" />
            </Link>
            <Link className="underline-none margin-left-8 margin-right-8 link">Products</Link>
            <Link className="underline-none margin-left-8 margin-right-8 link">Careers</Link>
            <Link className="underline-none margin-left-8 margin-right-8 link">About</Link>
           </div>
           <div className="flex flex-center-all margin-right-8">
                <Link className="underline-none margin-left-8 margin-right-8 link" to={'/signup/'}>Sign Up</Link>
                <Link className="underline-none margin-left-8 margin-right-8 link">Sign In</Link>
                {
                isAuthenticated && 
                <Link className="underline-none margin-left-8 margin-right-8 link">Sign Out</Link>
                } 
                <Link className="underline-none margin-left-8 margin-right-8">Profile Pic</Link>
           </div>
        </nav>
    )
}