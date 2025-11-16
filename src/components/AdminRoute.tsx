// src/components/AdminRoute.tsx
import { UserRole, useAuthStore } from "contexts/useAuthStore";
import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "./UI/Loader";

interface Props {
  children: JSX.Element;
}

const AdminRoute: React.FC<Props> = ({ children }) => {
  const currentUser = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  if (currentUser.role !== UserRole.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
