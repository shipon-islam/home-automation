import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../firebase/auth";

export default function ProtectedRoute() {
  const { currentUser } = UseAuth();
  if (currentUser?.role == "admin") {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
}
