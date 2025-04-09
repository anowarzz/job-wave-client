import Lottie from "lottie-react";
import { useContext, useState } from "react";
import loginLottieData from "../../assets/lottie/login.json";
import AuthContext from "../../context/AuthContext/AuthContext";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);

  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

  // SignIn a existing user  
    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log("User signed in successfully:", user);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });

    
  };

  return (
    <div className="hero bg-base-200 min-h-screen mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse lg:justify-around">
        <div className="text-center lg:text-left w-96 lg:w-1/2">
          <Lottie animationData={loginLottieData}> </Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 mt-4 text-4xl font-bold text-center">Sign In</h1>
          <form onSubmit={handleSignIn} className="card-body">
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
                <a className="link link-hover">Forgot password?</a>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
