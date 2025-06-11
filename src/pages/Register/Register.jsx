import Lottie from "lottie-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import registerLottieData from "../../assets/lottie/register.json";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import SocialLogin from "../shared/SocialLogin";

const Register = () => {
  const { createUser } = useAuth();
  const { isDarkMode } = useTheme();
  const [error, setError] = useState("");
  const [role, setRole] = useState("applicant");
  const [isLoading, setIsLoading] = useState(false);

  // Add navigation and location hooks
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Reset error
    setError("");

    // Email Validation
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailValidation.test(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    // Password Validation
    const passwordValidation = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordValidation.test(password)) {
      setError(
        "Password must be at least 6 characters long, contain at least one uppercase letter and one number."
      );
      setIsLoading(false);
      return;
    }

    // Registering a new user
    createUser(email, password)
      .then((result) => {
        const user = result.user;

        // add user info to the mongodb database

        const userInfo = {
          email: user.email,
          role: role,
          uid: user.uid,
          name: user.displayName || "",
          status: "active",
        };

        // Send user info to the database
        fetch("https://job-wave-server-khaki.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              console.log("User registered successfully in db", user);
              // Clear the form after successful registration
              form.reset();

              // Navigate to the home page or previous page after successful registration
              navigate(from, { replace: true });
              toast.success("Registration Complete");
            } else {
              setError("Failed to save user information. Please try again.");
              user
                .delete()
                .then(() => {
                  console.log(
                    "User deleted from Firebase due to DB save failure"
                  );
                })
                .catch((deleteError) => {
                  console.error(
                    "Error deleting user from Firebase:",
                    deleteError
                  );
                });
            }
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Error adding user to database:", err);
            setError("Failed to save user information. Please try again.");

            user
              .delete()
              .then(() => {
                console.log(
                  "User deleted from Firebase due to DB save failure"
                );
              })
              .catch((deleteError) => {
                console.error(
                  "Error deleting user from Firebase:",
                  deleteError
                );
              });
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);

        if (error.code === "auth/email-already-in-use") {
          setError("Email is already in use. Please use a different email.");
        } else if (error.code === "auth/weak-password") {
          setError("Password is too weak. Please choose a stronger password.");
        } else {
          setError("An error occurred during registration. Please try again.");
        }
        setIsLoading(false);
      });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    I am registering as
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className={`cursor-pointer rounded-lg transition-all duration-200 ${
                        role === "applicant"
                          ? isDarkMode
                            ? "bg-indigo-800 border-2 border-indigo-600"
                            : "bg-primary/10 border-2 border-primary"
                          : isDarkMode
                          ? "bg-gray-700 border border-gray-600 hover:bg-gray-650"
                          : "bg-white border border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setRole("applicant")}
                    >
                      <label
                        htmlFor="applicant"
                        className="cursor-pointer flex flex-col items-center justify-center p-2"
                      >
                        <div
                          className={`text-lg mb-0.5 ${
                            role === "applicant"
                              ? isDarkMode
                                ? "text-indigo-300"
                                : "text-primary"
                              : isDarkMode
                              ? "text-gray-300"
                              : "text-gray-600"
                          }`}
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
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <span
                          className={`block text-sm font-medium ${
                            role === "applicant"
                              ? isDarkMode
                                ? "text-white"
                                : "text-gray-900"
                              : isDarkMode
                              ? "text-gray-300"
                              : "text-gray-700"
                          }`}
                        >
                          Applicant
                        </span>
                      </label>
                      <input
                        id="applicant"
                        name="role"
                        type="radio"
                        value="applicant"
                        checked={role === "applicant"}
                        onChange={(e) => setRole(e.target.value)}
                        className="sr-only"
                      />
                    </div>
                    <div
                      className={`cursor-pointer rounded-lg transition-all duration-200 ${
                        role === "recruiter"
                          ? isDarkMode
                            ? "bg-indigo-800 border-2 border-indigo-600"
                            : "bg-primary/10 border-2 border-primary"
                          : isDarkMode
                          ? "bg-gray-700 border border-gray-600 hover:bg-gray-650"
                          : "bg-white border border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setRole("recruiter")}
                    >
                      <label
                        htmlFor="recruiter"
                        className="cursor-pointer flex flex-col items-center justify-center p-2"
                      >
                        <div
                          className={`text-lg mb-0.5 ${
                            role === "recruiter"
                              ? isDarkMode
                                ? "text-indigo-300"
                                : "text-primary"
                              : isDarkMode
                              ? "text-gray-300"
                              : "text-gray-600"
                          }`}
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
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <span
                          className={`block text-sm font-medium ${
                            role === "recruiter"
                              ? isDarkMode
                                ? "text-white"
                                : "text-gray-900"
                              : isDarkMode
                              ? "text-gray-300"
                              : "text-gray-700"
                          }`}
                        >
                          Recruiter
                        </span>
                      </label>
                      <input
                        id="recruiter"
                        name="role"
                        type="radio"
                        value="recruiter"
                        checked={role === "recruiter"}
                        onChange={(e) => setRole(e.target.value)}
                        className="sr-only"
                      />
                    </div>
                  </div>
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
                    disabled={isLoading}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ${
                      isDarkMode
                        ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-gray-900"
                        : "bg-primary hover:bg-primary/90 focus:ring-primary"
                    } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating account...
                      </div>
                    ) : (
                      "Create account"
                    )}
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

        <div className="w-full max-w-sm lg:w-2/5">
          <Lottie animationData={registerLottieData} />
        </div>
      </div>
    </div>
  );
};

export default Register;
