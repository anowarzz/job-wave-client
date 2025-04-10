import Lottie from "lottie-react";
import { useContext, useState } from "react";
import registerLottieData from "../../assets/lottie/register.json";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";

const Register = () => {
  const { createUser } = useContext(AuthContext);

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
    <div className="hero bg-base-200 min-h-screen mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse lg:justify-around">
        <div className="text-center lg:text-left w-96 lg:w-1/3">
          <Lottie animationData={registerLottieData}> </Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 mt-4 text-4xl font-bold text-center">
            Register now!
          </h1>
          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
              />
              <div>
                {/* <a className="link link-hover">Forgot password?</a> */}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
            <SocialLogin setError={setError} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
