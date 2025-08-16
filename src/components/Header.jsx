import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import Logo from "../assets/logo.svg";
import { LogOut, UserRound, CircleUserRound } from "lucide-react";
import { useAuth } from "../slices/Auth";
import app from "../fireBase";
import { getAuth } from "firebase/auth";

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const Auth=getAuth(app);


   function HandleLoggedOut() {
    Auth.signOut();
    
    navigate("/login")
  }
  return (
    <header className="bg-[rgba(0,0,0,.25)] flex justify-between items-center px-14 py-1">
      <Link to="/">
        <img src={Logo} alt="Logo" className="w-42 h-[50px] mx-auto " />
      </Link>

      <ul className="flex gap-8 items-center">
        <li>
          <Link
            to="/movies"
            className="text-white font-semibold hover:text-red-400 transition duration-300 cursor-pointer"
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            to="/tv"
            className="text-white font-semibold hover:text-red-400 transition duration-300 cursor-pointer"
          >
            TV Shows
          </Link>
        </li>
        <li>
          {/* <Link to="/login"  className="text-white cursor-pointer text-xl hover:text-red-400 transition duration-300" >
            Login
          </Link> */}
           {user ? (
              <button
                onClick={HandleLoggedOut}
                title="Logout"
                className="text-xl text-white hover:text-red-500 transition-colors duration-300 cursor-pointer"
              >
                <LogOut size={24} />
              </button>
            ) : (
              <Link
                to="/login"
                title="Login"
                className="text-xl text-white hover:text-blue-500 transition-colors duration-300 cursor-pointer"
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