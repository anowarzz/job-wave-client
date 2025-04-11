import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaCalculator,
  FaChartLine,
  FaCode,
  FaGraduationCap,
  FaMicrophone,
  FaPaintBrush,
  FaShoppingBag,
} from "react-icons/fa";

const JobsCategoryBrowse = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [categories] = useState([
    {
      id: 1,
      title: "Marketing & Sales",
      icon: <FaChartLine />,
      count: 43,
      color: "#38b2ac",
      darkColor: "#4fd1c5",
      gradient: "from-teal-400 to-cyan-400",
      darkGradient: "from-teal-500 to-cyan-600",
      popular: true,
    },
    {
      id: 2,
      title: "Customer Service",
      icon: <FaMicrophone />,
      count: 35,
      color: "#f6ad55",
      darkColor: "#fbd38d",
      gradient: "from-orange-300 to-yellow-300",
      darkGradient: "from-orange-400 to-yellow-500",
    },
    {
      id: 3,
      title: "Web Development",
      icon: <FaCode />,
      count: 67,
      color: "#805ad5",
      darkColor: "#9f7aea",
      gradient: "from-purple-400 to-indigo-400",
      darkGradient: "from-purple-500 to-indigo-600",
      popular: true,
    },
    {
      id: 4,
      title: "Finance & Accounting",
      icon: <FaCalculator />,
      count: 28,
      color: "#e53e3e",
      darkColor: "#fc8181",
      gradient: "from-red-400 to-pink-400",
      darkGradient: "from-red-500 to-pink-600",
    },
    {
      id: 5,
      title: "Human Resource",
      icon: <FaBriefcase />,
      count: 15,
      color: "#4299e1",
      darkColor: "#63b3ed",
      gradient: "from-blue-400 to-cyan-400",
      darkGradient: "from-blue-500 to-cyan-600",
    },
    {
      id: 6,
      title: "Design & Creative",
      icon: <FaPaintBrush />,
      count: 57,
      color: "#ed8936",
      darkColor: "#f6ad55",
      gradient: "from-orange-400 to-amber-400",
      darkGradient: "from-orange-500 to-amber-600",
      popular: true,
    },
    {
      id: 7,
      title: "Retail & Products",
      icon: <FaShoppingBag />,
      count: 32,
      color: "#48bb78",
      darkColor: "#68d391",
      gradient: "from-green-400 to-emerald-400",
      darkGradient: "from-green-500 to-emerald-600",
    },
    {
      id: 8,
      title: "Education & Training",
      icon: <FaGraduationCap />,
      count: 25,
      color: "#9f7aea",
      darkColor: "#b794f4",
      gradient: "from-purple-400 to-violet-400",
      darkGradient: "from-purple-500 to-violet-600",
    },
  ]);

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem("darkMode") === "true" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(isDarkMode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Restored gradient background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-slate-100/80 to-indigo-50/80 dark:from-gray-900/80 dark:via-slate-900/80 dark:to-indigo-950/80"></div>

      {/* Decorative background elements with enhanced patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Gradient blob 1 with animation */}
        <div
          className={`absolute -top-32 -left-32 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
            darkMode ? "bg-purple-700" : "bg-primary"
          } animate-pulse-slow`}
          style={{ animationDuration: "15s" }}
        ></div>

        {/* Gradient blob 2 with animation */}
        <div
          className={`absolute top-1/3 -right-32 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
            darkMode ? "bg-blue-700" : "bg-blue-500"
          } animate-pulse-slow`}
          style={{ animationDuration: "20s", animationDelay: "2s" }}
        ></div>

        {/* Gradient blob 3 with animation */}
        <div
          className={`absolute -bottom-32 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
            darkMode ? "bg-teal-700" : "bg-teal-500"
          } animate-pulse-slow`}
          style={{ animationDuration: "18s", animationDelay: "1s" }}
        ></div>

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 bg-grid-pattern opacity-5"
          style={{
            backgroundImage: `linear-gradient(to right, ${
              darkMode ? "#ffffff10" : "#00000010"
            } 1px, transparent 1px), 
                             linear-gradient(to bottom, ${
                               darkMode ? "#ffffff10" : "#00000010"
                             } 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            } transition-colors bg-gradient-to-r ${
              darkMode
                ? "from-white via-purple-100 to-white"
                : "from-gray-400 via-amber-700 to-gray-400"
            } bg-clip-text text-transparent`}
          >
            Find Jobs in Popular Categories
          </h2>
          <p
            className={`max-w-2xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-200"
            } transition-colors`}
          >
            Browse job opportunities by categories and find the perfect role
            that matches your skills and interests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 items-start">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`p-6 rounded-xl transition-all duration-700 
                 group cursor-pointer z-10 backdrop-blur-sm backdrop-saturate-150
                 hover:z-20 relative ${
                   darkMode
                     ? "bg-gray-800 border border-gray-700 shadow-lg shadow-gray-900/30"
                     : "bg-white/70 border border-gray-100 shadow-lg shadow-gray-300/20"
                 }`}
            >
              {/* Card inner content */}
              <div className="relative w-full transition-all duration-700 ease-in-out">
                {/* Popular badge with enhanced animation */}
                {category.popular && (
                  <div
                    className={`absolute -top-3 -right-3 px-3 py-1.5 text-xs font-semibold rounded-full shadow-md transition-all duration-500 ${
                      darkMode
                        ? `bg-gradient-to-r ${category.darkGradient} text-white`
                        : `bg-gradient-to-r ${category.gradient} text-white`
                    } group-hover:shadow-lg group-hover:scale-110 origin-center`}
                  >
                    Popular
                  </div>
                )}

                {/* Icon with enhanced hover effect */}
                <div
                  className={`w-20 h-20 mx-auto rounded-xl flex items-center justify-center mb-5 text-3xl transition-all duration-500 bg-gradient-to-br ${
                    darkMode ? category.darkGradient : category.gradient
                  } text-white relative overflow-hidden group-hover:scale-110 transform-gpu`}
                  style={{
                    boxShadow: darkMode
                      ? `0 10px 25px -5px ${category.darkColor}60`
                      : `0 10px 25px -5px ${category.color}60`,
                  }}
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                    <div className="absolute -inset-full top-0 h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                  </div>
                  <span className="relative z-10">{category.icon}</span>
                </div>

                {/* Title with animated underline */}
                <h3
                  className={`font-semibold text-xl mb-2 transition-colors group-hover:font-bold ${
                    darkMode
                      ? "text-white group-hover:text-purple-300"
                      : "text-gray-800 group-hover:text-primary"
                  } relative inline-block`}
                >
                  {category.title}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 ease-out group-hover:w-full ${
                      darkMode ? "bg-purple-400" : "bg-primary"
                    }`}
                  ></span>
                </h3>

                {/* Jobs count with enhanced design */}
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } transition-all duration-500`}
                >
                  <span
                    className={`font-medium text-base ${
                      darkMode ? "text-purple-300" : "text-primary"
                    } group-hover:text-lg transition-all duration-500`}
                  >
                    {category.count}
                  </span>{" "}
                  Jobs Available
                </p>

                {/* View Jobs button with fixed height to prevent card stretching */}
                <div className="h-10 mt-4 flex justify-center items-center">
                  <button
                    className={`text-sm font-medium py-1.5 px-4 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 ${
                      darkMode
                        ? "bg-gray-700 text-purple-300 hover:bg-purple-700 hover:text-white"
                        : "bg-gray-100 text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    View Jobs
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <button
            className={`font-medium py-3.5 px-12 rounded-full relative overflow-hidden group ${
              darkMode
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                : "bg-gradient-to-r from-primary to-blue-600 text-white"
            }`}
          >
            <span className="relative z-10">View All Categories</span>
            <span
              className={`absolute inset-0 w-0 h-full transition-all duration-300 ease-out ${
                darkMode ? "bg-indigo-500" : "bg-blue-500"
              } left-0 group-hover:w-full`}
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsCategoryBrowse;
