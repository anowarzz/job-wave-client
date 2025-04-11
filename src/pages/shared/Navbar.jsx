import { useContext, useState } from "react";
import { FaBriefcase, FaMoon, FaSun } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  // SignOut a user
  const handleSignOutUser = () => {
    signOutUser()
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.log("Error signing out:", error);
      });
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary dark:text-purple-400 font-bold"
              : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors duration-300"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            isActive
              ? "text-primary dark:text-purple-400 font-bold"
              : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors duration-300"
          }
        >
          Find Jobs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/companies"
          className={({ isActive }) =>
            isActive
              ? "text-primary dark:text-purple-400 font-bold"
              : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors duration-300"
          }
        >
          Companies
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-primary dark:text-purple-400 font-bold"
              : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors duration-300"
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="py-6 px-4 sm:px-6 md:px-12 bg-white dark:bg-gray-900 shadow-md font-rubik">
      <div className="container mx-auto flex flex-wrap md:flex-nowrap items-center">
        {/* Logo */}
        <div className="flex w-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-primary to-blue-500 flex items-center justify-center text-white">
              <FaBriefcase className="text-lg" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
            <div className="text-xl font-bold whitespace-nowrap">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Job
              </span>
              <span className="bg-gradient-to-r from-primary to-blue-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
                Wave
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex justify-center mx-auto">
          <ul className="flex gap-4 lg:gap-6">{links}</ul>
        </div>

        {/* User Authentication and Theme */}
        <div className="flex ml-auto items-center gap-2 md:gap-3">
          {/* Theme toggle button with improved hover effect */}
          <button
            onClick={handleDarkMode}
            className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-300
              hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md hover:shadow-gray-400/20 dark:hover:shadow-gray-900/30"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 text-sm" />
            ) : (
              <FaMoon className="text-sm" />
            )}
          </button>

          {user ? (
            <div className="flex items-center">
              {/* Profile/Avatar */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary transition-all duration-300 hover:shadow-md hover:shadow-primary/30 cursor-pointer"
                >
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-3 shadow bg-base-100 dark:bg-gray-800 rounded-box w-52 mt-2"
                >
                  <li className="font-semibold text-center mb-2 text-primary">
                    {user?.displayName}
                  </li>
                  <li>
                    <Link to="/profile">My Profile</Link>
                  </li>
                  <li>
                    <Link to="/applied-jobs">Applied Jobs</Link>
                  </li>
                  <li>
                    <button onClick={handleSignOutUser}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/signIn">
                <button className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-primary/30 transform hover:-translate-y-0.5">
                  Sign In
                </button>
              </Link>
              <Link to="/register" className="hidden sm:block">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                  Register
                </button>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-sm bg-base-100 dark:bg-gray-800 rounded-box z-[1] mt-3 w-52 p-3 shadow"
              >
                {links}
                {!user && (
                  <li className="mt-2">
                    <Link
                      to="/register"
                      className="bg-blue-500 hover:bg-blue-600 text-white justify-center py-2 rounded"
                    >
                      Register
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
