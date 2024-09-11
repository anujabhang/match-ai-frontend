// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ProtectedRoute = ({ element, requireAuth }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    // Show loading spinner or placeholder while checking auth status
    return <div>Loading...</div>;
  }

  if (requireAuth) {
    // Protected Route: Requires authentication
    return token ? element : <Navigate to="/login" replace />;
  } else {
    // Public Route: Redirect to home if logged in
    return token ? <Navigate to="/" replace /> : element;
  }
};
