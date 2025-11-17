// src/components/AdminRoute.tsx
import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

import { UserRole, useAuthStore } from "@/contexts/useAuthStore";
import { Loader } from "./shared/Loader";

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

  if (![UserRole.ADMIN, UserRole.MANAGER].includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
