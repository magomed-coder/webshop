// src/components/AdminRoute.tsx
import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

import { Loader } from "./shared/Loader";
import { ROLES, useAuthStore } from "@/contexts/auth.store";

interface Props {
  children: JSX.Element;
}

const AdminRoute: React.FC<Props> = ({ children }) => {
  const currentUser = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isAuthLoading);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  if (
    ![ROLES.SUBADMIN, ROLES.MANAGER].some((role) => role === currentUser.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
