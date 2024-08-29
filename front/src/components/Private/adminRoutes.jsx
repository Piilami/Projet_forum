import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ element }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.status !== "administrateur") {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default AdminRoute;
