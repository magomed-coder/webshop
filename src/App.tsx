import "./App.css";

import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "./pages/Main";

import Products from "./pages/Products";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories/CategoriesScreen/Categories";

import About from "./pages/About/About";

import { AiOutlineHome, AiOutlineAppstore } from "react-icons/ai";
import { FiUser } from "react-icons/fi";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-container">
      {/* Основной контент */}
      <div className={isMobile ? "mobile-content" : "desktop-content"}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>

      {/* Навигация для десктопа */}
      {!isMobile && (
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
          <Link to="/">Main</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/categories">Categories</Link>
        </nav>
      )}

      {/* Мобильный таббар */}
      {isMobile && (
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
            <AiOutlineAppstore className="tab-icon" />
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
      )}
    </div>
  );
}

export default App;
