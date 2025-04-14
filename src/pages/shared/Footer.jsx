import {
  FaBriefcase,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`py-12 px-4 sm:px-6 md:px-12 ${
        isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-700"
      } font-rubik`}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-primary to-blue-500 flex items-center justify-center text-white">
                <FaBriefcase className="text-lg" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="text-xl font-bold whitespace-nowrap">
                <span
                  className={`${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Job
                </span>
                <span className="bg-gradient-to-r from-primary to-blue-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
                  Wave
                </span>
              </div>
            </Link>

            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Building a better job market for everyone. We connect talented
              individuals with opportunities that match their skills and career
              aspirations.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-400 hover:bg-purple-900 hover:text-purple-400"
                    : "bg-gray-200 text-gray-600 hover:bg-primary hover:text-white"
                }`}
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="#"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-400 hover:bg-purple-900 hover:text-purple-400"
                    : "bg-gray-200 text-gray-600 hover:bg-primary hover:text-white"
                }`}
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-400 hover:bg-purple-900 hover:text-purple-400"
                    : "bg-gray-200 text-gray-600 hover:bg-primary hover:text-white"
                }`}
              >
                <FaLinkedinIn size={14} />
              </a>
              <a
                href="#"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-400 hover:bg-purple-900 hover:text-purple-400"
                    : "bg-gray-200 text-gray-600 hover:bg-primary hover:text-white"
                }`}
              >
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Quick Links
            </h6>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/jobs"
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/companies"
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Career Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h6
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Services
            </h6>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Resume Building
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Career Coaching
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Recruitment Solutions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Job Posting
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Employer Branding
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h6
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Contact Us
            </h6>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt
                  className={`mt-1 ${
                    isDarkMode ? "text-purple-400" : "text-primary"
                  }`}
                />
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  123 Innovation Drive, Tech District
                  <br />
                  San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt
                  className={isDarkMode ? "text-purple-400" : "text-primary"}
                />
                <a
                  href="tel:+1234567890"
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope
                  className={isDarkMode ? "text-purple-400" : "text-primary"}
                />
                <a
                  href="mailto:info@jobwave.com"
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  info@jobwave.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`mt-12 pt-6 border-t ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-500" : "text-gray-600"
              }`}
            >
              © {new Date().getFullYear()} JobWave Ltd. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className={`text-xs transition-colors duration-300 ${
                  isDarkMode
                    ? "text-gray-500 hover:text-purple-400"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className={`text-xs transition-colors duration-300 ${
                  isDarkMode
                    ? "text-gray-500 hover:text-purple-400"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                Terms of Use
              </Link>
              <Link
                to="/cookies"
                className={`text-xs transition-colors duration-300 ${
                  isDarkMode
                    ? "text-gray-500 hover:text-purple-400"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
