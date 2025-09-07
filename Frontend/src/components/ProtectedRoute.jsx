import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return null; 

  if (!user) return <Navigate to="/login" />;

  if (role === "admin" && !user.admin) return <Navigate to="/student" />;
  if (role === "student" && user.admin) return <Navigate to="/admin" />;

  return children;
}
