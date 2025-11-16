import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./AdminLayout.module.css";
import { Sidebar } from "@components/Sidebar";

export const AdminLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
