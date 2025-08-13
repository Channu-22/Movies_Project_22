import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import Logo from "../assets/logo.svg";

function Footer() {
  return (
    <footer className="bg-[rgba(0,0,0,.25)] mt-auto">
      {/* Main Footer Content */}
      <div className="flex flex-col lg:flex-row justify-between items-start px-14 py-8 gap-8">
        {/* Logo and Description */}
        <div className="flex flex-col items-start">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-42 h-[50px] mb-4" />
          </Link>
          <p className="text-white text-sm max-w-md leading-relaxed mb-4">
            Discover the latest movies and TV shows. Stay updated with trending content, 
            ratings, and reviews from around the world.
          </p>
          
          {/* Contact Info */}
          <div className="space-y-2">
            <p className="text-white font-semibold">Channu Sinnur</p>
            <div className="flex items-center gap-2">
              <MdEmail className="text-white text-sm" />
              <a 
                href="mailto:channusinnur22072002@gmail.com"
                className="text-white text-sm hover:text-red-400 transition duration-300"
              >
                channusinnur22072002@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MdPhone className="text-white text-sm" />
              <a 
                href="tel:9322605251"
                className="text-white text-sm hover:text-red-400 transition duration-300"
              >
                9322605251
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Movies</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="" 
                  className="text-white text-sm hover:text-red-400 transition duration-300"
                >
                  Popular
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-white text-sm hover:text-red-400 transition duration-300"
                >
                  Top Rated
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-white text-sm hover:text-red-400 transition duration-300"
                >
                  Upcoming
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-white text-sm hover:text-red-400 transition duration-300"
                >
                  Now Playing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">TV Shows</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="" 
                  className="text-white text-sm hover:text-red-400 transition duration-300"
                >
                  Popular
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-white text-sm hover:text-red-400 transition duration-300"
                >
                  Top Rated
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-white text-sm hover:text-red-400 transition duration-300"
                >
                  On The Air
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-white text-sm hover:text-red-400 transition duration-300"
                >
                  Airing Today
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="" 
                  className="text-white text-sm hover:text-red-400 transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-white text-sm hover:text-red-400 transition duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-white text-sm hover:text-red-400 transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-white text-sm hover:text-red-400 transition duration-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Me</h3>
            <div className="flex gap-3">
              <Link 
                to="" 
                className="text-white hover:text-red-400 transition duration-300"
              >
                <FaGithub className="text-lg" />
              </Link>
              <Link 
                to="" 
                className="text-white hover:text-red-400 transition duration-300"
              >
                <FaLinkedinIn className="text-lg" />
              </Link>
              <Link 
                to="" 
                className="text-white hover:text-red-400 transition duration-300"
              >
                <FaInstagram className="text-lg" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-600/30 px-14 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-sm">
            © 2025 Channu Sinnur. All rights reserved.
          </p>
          <p className="text-white text-sm">
            Powered by{" "}
            <Link 
              to="https://www.themoviedb.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-400 transition duration-300"
            >
              The Movie Database (TMDb)
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;