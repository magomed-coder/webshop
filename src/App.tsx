import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProductRedirect from "./pages/ProductRedirect";
import Categories from "./pages/Categories/CategoriesScreen/Categories";
import Profile from "./pages/Profile/Profile";
import Product from "./pages/Product/Product";
import ProductsScreen from "./pages/Products/ProductsScreen/ProductsScreen";
import About from "./pages/About/About";

import Main from "./pages/Main/MainScreen";
import AdminRoute from "./components/AdminRoute";
import { AdminLayout } from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";

import Payments from "./pages/admin/Payments";
import Settings from "./pages/admin/Settings";
// import Users from "./pages/admin/Users";
import NotFound from "./pages/NotFound";
import { AppNavigation } from "./navigation/Navigation";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Download from "./pages/Download";

import LoginScreen from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";

const HIDDEN_NAV_ROUTES = ["/download"];

// Создаем QueryClient с настройками для мобильного приложения
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: (failureCount, error) => {
        // Не повторяем запрос при ошибках аутентификации
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          if (status === 401 || status === 403) {
            return false;
          }
        }
        return failureCount < 3;
      },
    },
  },
});

function App() {
  const location = useLocation();
  const hideNavigation = HIDDEN_NAV_ROUTES.includes(location.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`app-container${hideNavigation ? " no-tabbar" : ""}`}>
        {/* Основной контент */}

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:categoryId" element={<ProductsScreen />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/invite/:referralCode" element={<Invite />} /> */}
          <Route path="/link/:referralCode" element={<ProductRedirect />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/download" element={<Download />} />

          <Route path="/admin/login" element={<LoginScreen />} />

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
            <Route path="users" element={<Users />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {!hideNavigation && <AppNavigation />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
