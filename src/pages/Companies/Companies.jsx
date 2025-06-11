import { motion } from "motion/react";
import { useState } from "react";
import { FaBell, FaBriefcase, FaBuilding, FaEnvelope } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";

const Companies = () => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would normally send this to your backend
      console.log("Subscribed with:", email);
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20">
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

      <div className="container relative z-10 px-4 py-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          {/* Company Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-primary to-blue-500 dark:from-purple-600 dark:to-indigo-600 flex items-center justify-center text-white">
              <FaBuilding className="text-4xl" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <FaBriefcase className="text-sm text-white" />
              </div>
            </div>
          </motion.div>

          {/* Coming soon text */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1
              className={`text-4xl md:text-5xl font-extrabold mb-4 ${
                isDarkMode
                  ? "bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-500"
                  : "bg-gradient-to-br from-primary via-amber-500 to-yellow-400"
              } bg-clip-text text-transparent`}
            >
              Companies Directory
            </h1>
            <h2
              className={`text-xl md:text-2xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Coming Soon
            </h2>
            <p
              className={`text-base md:text-lg mb-8 max-w-lg mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              We're working hard to bring you a comprehensive directory of top
              companies. Soon you'll be able to explore company profiles, open
              positions, and more!
            </p>
          </motion.div>

          {/* Features preview */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-10"
          >
            {[
              {
                icon: <FaBuilding />,
                title: "Company Profiles",
                description: "Detailed information about top companies",
              },
              {
                icon: <FaBriefcase />,
                title: "Job Listings",
                description: "Browse all open positions by company",
              },
              {
                icon: <FaBell />,
                title: "Alerts",
                description: "Get notified about new company additions",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-gray-800/50 border border-gray-700"
                    : "bg-white/80 border border-gray-200 shadow-sm"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto ${
                    isDarkMode
                      ? "bg-purple-900/50 text-purple-400"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {feature.icon}
                </div>
                <h3
                  className={`font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Notification form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-md mx-auto"
          >
            {!subscribed ? (
              <div>
                <h3
                  className={`font-bold mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Get notified when we launch
                </h3>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <div className="flex-grow">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-full focus:outline-none ${
                        isDarkMode
                          ? "bg-gray-800 text-white border border-gray-700 focus:border-purple-500"
                          : "bg-white text-gray-900 border border-gray-200 focus:border-primary"
                      }`}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className={`px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-600/30"
                        : "bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-lg hover:shadow-primary/30"
                    }`}
                  >
                    <FaEnvelope /> Notify Me
                  </button>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-4 rounded-xl ${
                  isDarkMode
                    ? "bg-purple-900/20 text-purple-300"
                    : "bg-green-50 text-green-700"
                }`}
              >
                <p className="font-medium">
                  Thank you! We'll notify you when we launch.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
