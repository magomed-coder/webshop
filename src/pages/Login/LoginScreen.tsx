import React, { useState } from "react";
import { useAuthStore } from "@/contexts/auth.store";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { Input } from "@/components/ui/input";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = useAuthStore((s) => s.login);
  const isAuthLoading = useAuthStore((s) => s.isAuthLoading);
  const error = useAuthStore((s) => s.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/admin");
    } catch {
      // Ошибка уже обработана в сторе
      alert(
        "Ошибка входа. Пожалуйста, проверьте ваши данные и попробуйте снова.",
      );
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Вход</h2>
        <Input
          type="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className={styles.error}>{error}</div>}
        <button
          type="submit"
          className={styles.button}
          disabled={isAuthLoading}
        >
          {isAuthLoading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
