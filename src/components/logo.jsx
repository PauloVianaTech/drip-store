import logo from '../assets/logo-header.svg';
import { Link } from 'react-router-dom';

const Logo = () =>{
    return (
        <Link to="/">
        <img
        src={logo}
        alt="Digital Store Logo"
        width={253}
        height={44}
        />    
        </Link>
    );
};

export default Logo;