import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getSession } from "../../services/authService";

function ProtectedRoute() {
  const location = useLocation();

  const session = getSession();

  if (!session?.token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;