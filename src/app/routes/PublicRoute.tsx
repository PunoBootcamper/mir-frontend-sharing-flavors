import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";

const PublicRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
