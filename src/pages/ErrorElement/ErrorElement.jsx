import { motion } from "motion/react";
import { FaArrowLeft, FaBriefcase, FaHome, FaSearch } from "react-icons/fa";
import { Link, useRouteError } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const ErrorElement = () => {
  const error = useRouteError();
  const { isDarkMode } = useTheme();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient and pattern */}
      <div
        className={`absolute inset-0 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-grid-pattern"></div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full opacity-10 dark:opacity-5 bg-gradient-to-br from-primary to-blue-500 dark:from-purple-600 dark:to-blue-700 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full opacity-10 dark:opacity-5 bg-gradient-to-tr from-purple-500 to-pink-500 dark:from-indigo-700 dark:to-purple-800 blur-3xl"></div>

      <div className="container relative z-10 px-4 py-16 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          {/* Animated 404 text */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-8"
          >
            <div className="relative inline-block">
              {/* Shadow text for 3D effect */}
              <div
                className={`absolute -z-10 blur-sm select-none text-9xl font-extrabold opacity-20 translate-x-1 translate-y-1 ${
                  isDarkMode ? "text-purple-800" : "text-primary/50"
                }`}
              >
                404
              </div>
              {/* Main 404 text with gradient */}
              <h1
                className={`text-9xl font-extrabold ${
                  isDarkMode
                    ? "bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-500"
                    : "bg-gradient-to-br from-primary via-amber-500 to-yellow-400"
                } bg-clip-text text-transparent`}
              >
                404
              </h1>
            </div>
          </motion.div>

          {/* Error message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2
              className={`text-2xl md:text-3xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Oops! Page Not Found
            </h2>
            <p
              className={`text-base md:text-lg mb-8 max-w-lg mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              The page you're looking for doesn't exist or has been moved.
              {error?.message && (
                <span className="block mt-2 text-sm italic">
                  Error: {error.message}
                </span>
              )}
            </p>
          </motion.div>

          {/* Logo icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-primary to-blue-500 dark:from-purple-600 dark:to-indigo-600 flex items-center justify-center text-white">
              <FaBriefcase className="text-3xl" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"></div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className={`px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-600/30"
                  : "bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-lg hover:shadow-primary/30"
              }`}
            >
              <FaHome /> Back to Home
            </Link>
            <Link
              to="/jobs"
              className={`px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <FaSearch /> Browse Jobs
            </Link>
          </motion.div>

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8"
          >
            <button
              onClick={() => window.history.back()}
              className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                isDarkMode
                  ? "text-gray-300 hover:text-purple-400"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              <FaArrowLeft size={14} /> Go Back
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ErrorElement;
