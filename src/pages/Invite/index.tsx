// src/pages/Invite/Invite.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Invite.module.css";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { Button } from "@components/UI/Button";
import { Input } from "@components/UI/Input";

function Invite() {
  const { referralCode } = useParams<{ referralCode: string }>();
  const [os, setOs] = useState<"ios" | "android" | "other">("other");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) setOs("android");
    else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
      setOs("ios");
    else setOs("other");
  }, []);

  const handleRegister = () => {
    console.log("Зарегистрировался по ссылке:", referralCode);

    if (os === "android") {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.yourapp";
    } else if (os === "ios") {
      window.location.href = "https://apps.apple.com/app/yourapp/idXXXXXXXXX";
    } else {
      alert("Приложение доступно только на iOS и Android");
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.trim() !== confirmPassword.trim()) {
      alert("Пароли не совпадают!");
      return;
    }

    // Здесь можно вызвать API регистрации
    console.log("Регистрация:", { email, password });

    // Переход на страницу подтверждения
    // navigate(`/auth-otp?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Регистрация</h1>

        <div className={styles.inputsWrapper}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите ваш email"
          />

          <Input
            label="Пароль"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Придумайте пароль"
            rightIcon={showPassword ? <FiEyeOff /> : <FiEye />}
            onIconClick={() => setShowPassword((prev) => !prev)}
          />

          <Input
            label="Подтвердите пароль"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Повторите пароль"
            rightIcon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            onIconClick={() => setShowConfirmPassword((prev) => !prev)}
          />
        </div>

        <Button
          icon={<FiLogIn />}
          label="Зарегистрироваться"
          onClick={handleSubmit}
        />

        <button
          type="button"
          className={styles.linkBtn}
          onClick={() => navigate("/login")}
        >
          Есть аккаунт? Войти
        </button>
      </form>
    </div>
  );
}

export default Invite;
