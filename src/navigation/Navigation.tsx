import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome, AiFillAppstore } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { useIsMobile } from "hooks/useIsMobile";

export function AppNavigation() {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Скрываем навигацию на страницах админки
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  {
    /* Мобильный таббар */
  }
  if (isMobile) {
    return (
      <div className="tab-bar">
        <Link
          to="/"
          className={`tab-item ${location.pathname === "/" ? "active" : ""}`}
        >
          <AiOutlineHome className="tab-icon" />
          <span className="tab-label">Главная</span>
        </Link>

        <Link
          to="/categories"
          className={`tab-item ${
            location.pathname === "/categories" ? "active" : ""
          }`}
        >
          <AiFillAppstore className="tab-icon" />
          <span className="tab-label">Категории</span>
        </Link>

        <Link
          to="/profile"
          className={`tab-item ${
            location.pathname === "/profile" ? "active" : ""
          }`}
        >
          <FiUser className="tab-icon" />
          <span className="tab-label">Профиль</span>
        </Link>
      </div>
    );
  }

  {
    /* Навигация для десктопа */
  }
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <Link to="/">Main</Link>
      <Link to="/about">About</Link>
      <Link to="/products">Products</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/categories">Categories</Link>
    </nav>
  );
}
