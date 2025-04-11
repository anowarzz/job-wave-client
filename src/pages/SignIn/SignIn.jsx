import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import loginLottieData from "../../assets/lottie/login.json";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import SocialLogin from "../shared/SocialLogin";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const { isDarkMode } = useTheme();
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    // Clear any previous errors
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // set error if email or pass is empty
    if (!email || !password) {
      setError("Please fill in all fields.");
      return; // Stop further execution if validation fails
    }

    console.log(email, password);

    // SignIn a existing user
    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log("User signed in successfully:", user);

        // Clear the form after successful login
        form.reset();
      })
      .catch((error) => {
        console.log(error.code, error.message);
        // set the error message only the meaningful error message provided by firebase

        if (error.code === "auth/user-not-found") {
          setError("User not found. Please register first.");
        } else if (error.code === "auth/invalid-credential") {
          setError("Incorrect password. Please try again.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background decorative elements */}
        <div
          className={`absolute -top-32 -left-32 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
            isDarkMode ? "bg-purple-700" : "bg-primary"
          } animate-pulse-slow`}
          style={{ animationDuration: "15s" }}
        ></div>

        <div
          className={`absolute bottom-0 right-0 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
            isDarkMode ? "bg-blue-700" : "bg-blue-500"
          } animate-pulse-slow`}
          style={{ animationDuration: "20s", animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 relative z-10 mx-auto px-4 sm:px-6">
        {/* Form Section - Now on left side */}
        <div className="w-full max-w-sm lg:w-2/5">
          <div
            className={`rounded-2xl shadow-xl overflow-hidden ${
              isDarkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="px-6 py-6 sm:px-8">
              <h2
                className={`text-2xl font-bold text-center mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Sign in to your account
              </h2>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:ring-offset-gray-900"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-primary"
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:ring-offset-gray-900"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-primary"
                      }`}
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a
                      href="#"
                      className={`font-medium hover:underline ${
                        isDarkMode
                          ? "text-indigo-300 hover:text-indigo-200"
                          : "text-primary hover:text-primary/80"
                      }`}
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="text-sm">
                    <Link
                      to="/register"
                      className={`font-medium hover:underline ${
                        isDarkMode
                          ? "text-indigo-300 hover:text-indigo-200"
                          : "text-primary hover:text-primary/80"
                      }`}
                    >
                      Don't have an account?
                    </Link>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ${
                      isDarkMode
                        ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-gray-900"
                        : "bg-primary hover:bg-primary/90 focus:ring-primary"
                    }`}
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <div
                className={`mt-6 relative ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <div className="absolute inset-0 flex items-center">
                  <div
                    className={`w-full border-t ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  ></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span
                    className={`px-2 ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <SocialLogin setError={setError} />
              </div>
            </div>
          </div>
        </div>

        {/* Lottie Animation - Now on right side */}
        <div className="w-full max-w-sm lg:w-2/5">
          <Lottie animationData={loginLottieData} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
