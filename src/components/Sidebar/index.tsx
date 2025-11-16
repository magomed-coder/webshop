import { NavLink, useLocation } from "react-router-dom";

import styles from "./Sidebar.module.css";

import {
  LuHouse,
  LuShoppingCart,
  LuPackage,
  LuCreditCard,
  LuUsers,
  LuSettings,
  LuShield,
  LuLogOut,
} from "react-icons/lu";
import { useAuthStore } from "contexts/useAuthStore";
import { LogoutButton } from "@components/LogoutButton";

// import { LogoutButton } from "./LogoutButton";

export const Sidebar = () => {
  const location = useLocation();
  const currentUser = useAuthStore((state) => state.user);

  // Меню для обычных пользователей
  const userMenu = [
    { path: "/admin/dashboard", label: "Главная", icon: LuHouse },
    { path: "/admin/orders", label: "Заказы", icon: LuShoppingCart },
    { path: "/admin/payments", label: "Оплаты", icon: LuCreditCard },
    { path: "/admin/products", label: "Товары", icon: LuPackage },
  ];

  // Меню для администратора
  const adminMenu = [
    ...userMenu,
    { path: "/admin/settings", label: "Настройки", icon: LuSettings },
    { path: "/admin/users", label: "Пользователи", icon: LuUsers },
    { path: "/admin/admin", label: "Админ-панель", icon: LuShield },
  ];

  const menuItems = currentUser?.role === "admin" ? adminMenu : userMenu;

  return (
    <nav className={styles.sidebar}>
      <div className={styles.wrapper}>
        <ul className={styles.menu}>
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
              >
                <item.icon className={styles.icon} />
                <span className={styles.label}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.bottom}>
          <LogoutButton icon={<LuLogOut />} />
        </div>
      </div>
    </nav>
  );
};
