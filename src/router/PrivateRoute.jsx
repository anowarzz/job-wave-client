import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../context/AuthContext/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(location);

  if (loading)
    return (
      <div>
        <span className="loading loading-dots loading-xs"></span>
        <span className="loading loading-dots loading-sm"></span>
        <span className="loading loading-dots loading-md"></span>
        <span className="loading loading-dots loading-lg"></span>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  if (user) {
    return children;
  }

  return <Navigate to="/signIn" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
