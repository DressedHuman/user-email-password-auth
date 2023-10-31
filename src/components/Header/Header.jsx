import { NavLink } from "react-router-dom";
import './Header.css'

const Header = () => {
    return (
        <div className="py-7 px-12 flex justify-between items-center gap-7">
            <NavLink className={({ isActive, isPending }) => isActive ? "active" : isPending ? 'pending' : ''} to={'/'}>Home</NavLink>

            {
                <div className="flex justify-center items-center gap-7">
                    <NavLink className={({ isActive, isPending }) => isActive ? "active" : isPending ? 'pending' : ''} to={'/login'}>Login</NavLink>
                    <p>or</p>
                    <NavLink className={({ isActive, isPending }) => isActive ? "active" : isPending ? 'pending' : ''} to={'/register'}>Sign Up</NavLink>
                </div>
            }
        </div>
    );
};

export default Header;