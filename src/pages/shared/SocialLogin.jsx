import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

const SocialLogin = ({ setError }) => {
  const { signInWithGoogle, googleLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // Clear any previous errors
    if (setError) {
      setError("");
    }

    signInWithGoogle()
      .then((result) => {
        console.log("Google sign-in successful:", result.user);
        navigate("/");
      })
      .catch((error) => {
        console.error("Google sign-in error:", error.message);

        // Set the appropriate error message if setError function is provided
        if (setError) {
          if (error.code === "auth/popup-closed-by-user") {
            setError("Sign-in with Google was cancelled.");
          } else if (error.code === "auth/network-request-failed") {
            setError("Network error. Please check your connection.");
          } else {
            setError(
              "An error occurred during Google sign-in. Please try again."
            );
          }
        }
      });
  };

  return (
    <div className="mt-5">
      <div className="divider">OR</div>
      <button
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-md shadow-sm hover:bg-gray-700 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="24px"
          height="24px"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          />
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          />
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          />
        </svg>
        <span className="ml-3 font-medium">
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
