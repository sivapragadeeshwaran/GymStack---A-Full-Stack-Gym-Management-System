import { Navigate } from "react-router-dom";
import { useAuth } from "../../services/authService";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles =[] }) => {
  const { authUser, loading } = useAuth();
   const location = useLocation();

   
  if (loading) {
    // you can replace with a spinner placeholder if you have one
    return null;
  }

  if (!authUser) {
    return <Navigate to="/unauthorized" />;
  }

   if (allowedRoles.length > 0 && !allowedRoles.includes(authUser.role)) {
    // role not allowed
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default ProtectedRoute;