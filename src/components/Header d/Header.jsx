import { NavLink } from "react-router-dom";
import './Header.css'

const Header = () => {
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <NavLink className={({isActive, isPending}) => isActive ? "active" : isPending ? "pending" : "pending"}>AuthTester</NavLink>
                </div>
                <div className="flex-none">
                    <NavLink className={({isActive, isPending}) => isActive ? "active" : isPending ? "pending" : "pending"}>Login</NavLink>
                    <NavLink className={({isActive, isPending}) => isActive ? "active" : isPending ? "pending" : "pending"}>Register</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Header;