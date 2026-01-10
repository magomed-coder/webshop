import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./LogoutButton.module.css";
import { LuLogOut } from "react-icons/lu";
import { useAuthStore } from "@/contexts/auth.store";

interface LogoutButtonProps {
  className?: string;
  label?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  className = "",
  label = "Выйти",
  isLoading = false,
  icon = <LuLogOut className={styles.icon} />,
}) => {
  // const logout = useAuthStore();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    if (isLoading) return;

    logout();
    navigate("/login");
  };

  const buttonLabel = isLoading ? `${label}...` : label;

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`
        ${styles.button}
        ${isLoading ? styles.loading : styles.default}
        ${className}
      `}
    >
      {icon && icon}
      {buttonLabel}
    </button>
  );
};
