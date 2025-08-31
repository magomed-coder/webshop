import "./App.css";

import { Route, Routes } from "react-router-dom";

import Main from "./pages/Main/MainScreen";
import Product from "./pages/Products/Product/Product";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories/CategoriesScreen/Categories";
import About from "./pages/About/About";

import { AppNavigation } from "navigation/Navigation";
import ProductsScreen from "@pages/Products/ProductsScreen/ProductsScreen";

function App() {
  return (
    <div className="app-container">
      {/* Основной контент */}
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/products" element={<Products />} /> */}
          {/* <Route path="/products/:id" element={<Product />} /> */}
          {/* <Route path="/products/:id" element={<ProductDetailScreen />} /> */}
          <Route path="/products/:categoryName" element={<ProductsScreen />} />
          <Route path="/products/:categoryName/:id" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
      <AppNavigation />
    </div>
  );
}

export default App;
