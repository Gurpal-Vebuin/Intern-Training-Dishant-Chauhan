import { useUser } from "../hooks/useUser";
import { Links } from "../types/constants/Links/Links";
import { RequireAuthProps } from "../types/interfaces/interface";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: RequireAuthProps) => {
  const context = useUser();

  if (!context?.isLoggedIn) {
    console.log(ProtectedRoutes);
    return <Navigate to={Links.HOME} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
