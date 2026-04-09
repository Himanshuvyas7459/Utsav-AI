import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useSelector((state) => state.auth);

  // 🔥 MOST IMPORTANT FIX
  if (isLoading) {
    return <h1>Loading...</h1>; // ya spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleRoute;