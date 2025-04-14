import Lottie from "lottie-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import registerLottieData from "../../assets/lottie/register.json";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import SocialLogin from "../shared/SocialLogin";

const Register = () => {
  const { createUser } = useAuth();
  const { isDarkMode } = useTheme();
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Reset error
    setError("");

    // Email Validation
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailValidation.test(email)) {
      setError("Please enter a valid email address.");
      return; // Add this to stop further validation
    }

    // Password Validation
    const passwordValidation = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordValidation.test(password)) {
      setError(
        "Password must be at least 6 characters long, contain at least one uppercase letter and one number."
      );
      return;
    }

    // Registering a new user
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log("User registered successfully:", user);
        // Clear the form after successful registration
        form.reset();
      })
      .catch((error) => {
        console.log(error);

        // Handle specific Firebase errors
        if (error.code === "auth/email-already-in-use") {
          setError("Email is already in use. Please use a different email.");
        } else if (error.code === "auth/weak-password") {
          setError("Password is too weak. Please choose a stronger password.");
        } else {
          setError("An error occurred during registration. Please try again.");
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
          className={`absolute -top-32 -right-32 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
            isDarkMode ? "bg-indigo-700" : "bg-blue-500"
          } animate-pulse-slow`}
          style={{ animationDuration: "15s" }}
        ></div>

        <div
          className={`absolute bottom-0 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
            isDarkMode ? "bg-purple-700" : "bg-primary"
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
                Create your account
              </h2>

              <form onSubmit={handleRegister} className="space-y-4">
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
                      autoComplete="new-password"
                      required
                      className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:ring-offset-gray-900"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-primary"
                      }`}
                      placeholder="Create a password"
                    />
                  </div>
                  <p
                    className={`mt-2 text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Password must be at least 6 characters with one uppercase
                    letter and one number
                  </p>
                </div>

                <div className="flex items-center justify-end">
                  <div className="text-sm">
                    <Link
                      to="/signin"
                      className={`font-medium hover:underline ${
                        isDarkMode
                          ? "text-indigo-300 hover:text-indigo-200"
                          : "text-primary hover:text-primary/80"
                      }`}
                    >
                      Already have an account?
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
                    Create account
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
          <Lottie animationData={registerLottieData} />
        </div>
      </div>
    </div>
  );
};

export default Register;
