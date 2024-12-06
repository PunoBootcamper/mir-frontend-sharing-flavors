import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !user.profile.role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.profile.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  console.log("User is allowed to access this route");

  return <Outlet />;
};

export default ProtectedRoute;
