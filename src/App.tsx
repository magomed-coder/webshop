import { Navigate, Route, Routes } from "react-router-dom";

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
import AdminRoute from "@components/AdminRoute";

import Dashboard from "@pages/admin/Dashboard";
import Orders from "@pages/admin/Orders";
import Products from "@pages/admin/Products";
import Payments from "@pages/admin/Products";
import Settings from "@pages/admin/Settings";
import Users from "@pages/admin/Users";
import { AdminLayout } from "layout/AdminLayout";

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

        {/* 🔐 Только для ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* Если пользователь заходит на /admin без вложенного пути — редиректим на Dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          {/* /admin/dashboard */}
          <Route path="dashboard" element={<Dashboard />} />
          {/* /admin/orders */}
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="payments" element={<Payments />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Payments />} />
          <Route path="users" element={<Users />} />
        </Route>

        <Route path="/admin/login" element={<Main />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <AppNavigation />
    </div>
  );
}

export default App;
