// app/auth/Profile.tsx
import React, { useState } from "react";
import {
  FiUser,
  FiInfo,
  FiUsers,
  FiLogIn,
  FiChevronRight,
} from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";

import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

import {
  MdLogout,
  MdOutlineAccountBalanceWallet,
  MdOutlineAccountCircle,
} from "react-icons/md";
import { InfoScreen } from "@/components/shared/InfoScreen";
import { useAuthStore } from "@/contexts/auth.store";
import ConfirmModal from "@/components/shared/ConfirmModal/ConfirmModal";
import { detectPlatform } from "@/lib/utils/detectPlatform";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/main";

interface SettingsItemProp {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  textStyle?: string;
  containerStyle?: string;
  showArrow?: boolean;
}

const SettingsItem: React.FC<SettingsItemProp> = ({
  icon,
  title,
  onClick,
  textStyle,
  containerStyle,
  showArrow = true,
}) => (
  <div
    onClick={onClick}
    className={`${styles.settingsItemContainer} ${containerStyle || ""} ${
      !onClick ? styles.disabledItem : ""
    }`}
  >
    <div className={styles.settingsItemContent}>
      {icon}
      <span className={`${styles.settingsText} ${textStyle || ""}`}>
        {title}
      </span>
    </div>
    {onClick && showArrow && <FiChevronRight size={20} />}
  </div>
);

const Profile: React.FC = () => {
  const { isAuth } = useAuthStore();
  const navigate = useNavigate();
  const [isAuthUnavailableModalOpen, setAuthUnavailableModalOpen] =
    useState(false);

  const openAuthUnavailableModal = () => {
    setAuthUnavailableModalOpen(true);
  };
  const platform = detectPlatform();

  const closeAuthUnavailableModal = () => {
    const storeUrl = platform === "ios" ? APP_STORE_URL : GOOGLE_PLAY_URL;
    window.open(storeUrl, "_blank");

    setAuthUnavailableModalOpen(false);
  };

  // Исправлено условие: показываем форму входа если пользователь НЕ аутентифицирован
  if (!isAuth) {
    return (
      <>
        <InfoScreen
          icon={<MdOutlineAccountCircle size={100} color="#999" />}
          title="Упс! Вы не вошли в аккаунт"
          text="Пожалуйста, авторизуйтесь, чтобы получить доступ к своему профилю."
          buttonLabel="Войти"
          buttonIcon={<FiLogIn size={24} />}
          // onButtonClick={() => navigate("/login")}
          onButtonClick={openAuthUnavailableModal}
        />

        <ConfirmModal
          isOpen={isAuthUnavailableModalOpen}
          onClose={closeAuthUnavailableModal}
          onConfirm={closeAuthUnavailableModal}
          title="Вход недоступен в веб-версии"
          description="Полный доступ к профилю и авторизация сейчас доступны только в мобильном приложении."
          confirmText={
            platform === "ios" ? "Скачать в App Store" : "Скачать в Google Play"
          }
          icon={<MdOutlineAccountCircle size={28} />}
          variant="primary"
        />
      </>
    );
  }

  const handleLogout = async () => {
    await useAuthStore.getState().logout();
    navigate("/login", { replace: true });
  };

  const items: SettingsItemProp[] = [
    {
      title: "Платежи",
      icon: <MdOutlineAccountBalanceWallet size={24} />,
      onClick: () => navigate("/profile/payments"),
    },
    {
      title: "Сменить email",
      icon: <FiUser size={24} />,
      onClick: () => navigate("/profile/change-email"),
    },
    {
      title: "Сменить пароль",
      icon: <IoLockClosedOutline size={24} />,
      onClick: () => navigate("/profile/change-password"),
    },
    {
      title: "Центр поддержки",
      icon: <FiInfo size={24} />,
      onClick: () => navigate("/profile/support"),
    },
    {
      title: "Пригласить друзей",
      icon: <FiUsers size={24} />,
      onClick: () => navigate("/profile/invite"),
    },
  ];

  const appVersion = "1.0.0";

  return (
    <>
      <div className={styles.safeArea}>
        <div className={styles.scrollContainer}>
          <div className={styles.section}>
            {items.slice(0, 1).map((item, idx) => (
              <SettingsItem key={idx} {...item} />
            ))}
          </div>
          <div className={`${styles.section} ${styles.borderedSection}`}>
            {items.slice(1).map((item, idx) => (
              <SettingsItem key={idx} {...item} />
            ))}
          </div>

          <SettingsItem
            title="Выйти"
            icon={<MdLogout size={24} />}
            onClick={handleLogout}
            textStyle={styles.dangerText}
            showArrow={false}
            containerStyle={styles.logout}
          />

          <div className={styles.versionContainer}>
            <span className={styles.versionText}>Версия {appVersion}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
