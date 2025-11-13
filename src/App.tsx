import { Route, Routes } from "react-router-dom";

import Main from "./pages/Main/MainScreen";
import Product from "./pages/Product/Product";
import Profile from "./pages/Profile/Profile";
import Categories from "./pages/Categories/CategoriesScreen/Categories";
import About from "./pages/About/About";

import { AppNavigation } from "navigation/Navigation";
import ProductsScreen from "@pages/Products/ProductsScreen/ProductsScreen";
import NotFound from "@pages/NotFound";
import Invite from "@pages/Invite";
import ProductRedirect from "@pages/ProductRedirect";

function App() {
  return (
    <div className="app-container">
      {/* Основной контент */}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:categoryName" element={<ProductsScreen />} />
        <Route path="/products/:categoryName/:id" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/invite/:referralCode" element={<Invite />} />
        <Route
          path="/product-link/:referralCode"
          element={<ProductRedirect />}
        />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <AppNavigation />
    </div>
  );
}

export default App;
