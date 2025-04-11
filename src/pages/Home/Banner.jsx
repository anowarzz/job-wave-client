import { motion } from "motion/react";
import team1Img from "../../assets/team/team1.jpg";
import team2Img from "../../assets/team/team2.jpg";

const Banner = () => {
  return (
    <div className="relative overflow-hidden min-h-[500px] flex items-center">
      {/* Banner background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 z-0"></div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-grid-pattern z-0"></div>

      <div className="container mx-auto px-4 py-12 z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
          {/* Image section - kept unchanged as requested */}
          <div className="flex-1 flex flex-col justify-center items-center">
            <motion.img
              src={team1Img}
              animate={{ y: [20, 60, 20] }}
              transition={{
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="max-w-sm w-64 rounded-t-[35px] rounded-br-[35px] border-l-4 border-b-4 border-teal-600 shadow-2xl"
              alt="Team celebrating image"
            />
            <motion.img
              src={team2Img}
              animate={{ x: [100, 150, 100] }}
              transition={{
                duration: 10,
                delay: 5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="max-w-sm w-64 rounded-t-[35px] rounded-br-[35px] border-l-4 border-b-4 border-amber-900 shadow-2xl"
              alt="Team celebrating image"
            />
          </div>

          {/* Text content section */}
          <div className="flex-1 my-6 lg:my-0 max-w-xl">
            <div className="space-y-3 mb-6">
              {/* Enhanced colorful badge with unique shape */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8 }}
                className="relative inline-block"
              >
                <div
                  className="px-5 py-2 font-medium text-sm text-white relative z-10 overflow-hidden"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%)",
                  }}
                >
                  {/* Softer gradient background for light/dark modes */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-500 dark:from-indigo-600 dark:via-purple-700 dark:to-blue-600"></div>

                  {/* Animated gradient overlay with reduced opacity */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>

                  {/* Badge content */}
                  <span className="relative z-10 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Find Your Dream Career
                  </span>
                </div>

                {/* Decorative shadow/border effect with adjusted colors */}
                <div
                  className="absolute top-1 left-1 right-1 bottom-1 bg-blue-600/50 dark:bg-indigo-800/50 -z-10"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%)",
                  }}
                ></div>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease: "easeOut",
                }}
                className="text-4xl md:text-5xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                  Latest
                </span>{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-primary dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Jobs
                </span>{" "}
                <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                  For You!
                </span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5,
                  ease: "easeOut",
                }}
                className="py-4 text-gray-600 dark:text-gray-300 leading-relaxed text-base"
              >
                Discover career opportunities tailored to your skills and
                aspirations. Our platform connects talented professionals with
                leading companies looking for the perfect match. Take the next
                step in your professional journey today.
              </motion.p>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.7,
                ease: "easeOut",
              }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button
                className="px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white font-medium rounded-full shadow-md transition-all duration-300 
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
                hover:bg-gradient-to-r hover:from-blue-600 hover:to-primary hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-700/40"
              >
                Get Started
              </button>

              <button
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium rounded-full shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300
                hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-blue-400 hover:border-primary dark:hover:border-blue-500 hover:shadow-md"
              >
                Explore Jobs
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
