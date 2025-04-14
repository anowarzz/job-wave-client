import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../context/AuthContext/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-700 mb-4"></div>
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    );

  if (user) {
    return children;
  }

  return <Navigate to="/signIn" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
