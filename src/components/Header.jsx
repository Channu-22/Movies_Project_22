import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { SquareMenu, LogOut, CircleUserRound } from "lucide-react";
import { useAuth } from "../slices/Auth";
import app from "../fireBase";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import Logo from "../assets/logo.svg";

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLoggedOut() {
    auth.signOut();
    navigate("/login");
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="bg-[rgba(0,0,0,.25)] flex justify-between items-center px-4 sm:px-14 py-1">
      <Link to="/">
        <img src={Logo} alt="Logo" className="w-32 sm:w-42 h-[50px] mx-auto" />
      </Link>

      {/* Hamburger Menu Icon (Visible < 550px) */}
      <button
        className="sm:hidden text-white hover:text-red-400 transition duration-300"
        onClick={toggleMenu}
        title="Menu"
      >
        <SquareMenu size={24} className="text-red-600"/>
      </button>

      {/* Navigation Menu */}
      <ul
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row gap-4 sm:gap-8 items-center absolute sm:static top-16 right-0 w-[150px] sm:w-auto bg-[rgba(0,0,0,.75)] sm:bg-transparent p-4 sm:p-0 z-10 sm:z-auto transition-all duration-300`}
      >
        <li>
          <Link
            to="/contact"
            className="text-white font-semibold hover:text-red-400 transition duration-300 underline cursor-pointer"
            onClick={() => setIsMenuOpen(false)} // Close menu on click
          >
            Contact
          </Link>
        </li>
        
        <li>
          <Link
            to="/movies"
            className="text-white font-semibold hover:text-red-400 transition duration-300 underline cursor-pointer"
            onClick={() => setIsMenuOpen(false)} // Close menu on click
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            to="/tv"
            className="text-white font-semibold hover:text-red-400 transition duration-300 underline cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            TV Shows
          </Link>
        </li>
        <li>
          {user ? (
            <button
              onClick={() => {
                handleLoggedOut();
                setIsMenuOpen(false);
              }}
              title="Logout"
              className="text-xl text-white hover:text-red-500 transition-colors duration-300  cursor-pointer flex items-center gap-2"
            >
              <LogOut size={24} /> <span className="sm:hidden">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              title="Login"
              className="text-xl text-white hover:text-blue-500 transition-colors duration-300 cursor-pointer flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <CircleUserRound size={24} /> 
            </Link>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
