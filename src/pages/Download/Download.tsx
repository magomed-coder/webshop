import React, { useEffect } from "react";
import { FaApple, FaAndroid } from "react-icons/fa";
import { getMobileOS } from "@/lib/utils/getMobileOS";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/main";
import styles from "./Download.module.css";

const Download: React.FC = () => {
  const platform = getMobileOS();

  useEffect(() => {
    // Автоматический редирект через 5 секунд
    const timer = setTimeout(() => {
      window.location.href =
        platform === "ios" ? APP_STORE_URL : GOOGLE_PLAY_URL;
    }, 5000);
    return () => clearTimeout(timer);
  }, [platform]);

  const handleDownload = () => {
    window.location.href = platform === "ios" ? APP_STORE_URL : GOOGLE_PLAY_URL;
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          {platform === "ios" ? (
            <FaApple size={64} color="#fff" />
          ) : (
            <FaAndroid size={64} color="#3DDC84" />
          )}
        </div>

        <h1 className={styles.title}>
          {platform === "ios"
            ? "Скачать из App Store"
            : "Скачать APK для Android"}
        </h1>

        <p className={styles.description}>
          {platform === "ios"
            ? "Вы будете перенаправлены в App Store для загрузки приложения."
            : "Вы будете перенаправлены для загрузки APK файла."}
        </p>

        <p className={styles.redirect}>
          Автоматическое перенаправление через 5 секунд...
        </p>

        <button className={styles.button} onClick={handleDownload}>
          {platform === "ios" ? (
            <>
              <FaApple size={20} /> Открыть App Store
            </>
          ) : (
            <>
              <FaAndroid size={20} /> Скачать APK
            </>
          )}
        </button>

        <div className={styles.alternativeLinks}>
          <p className={styles.altTitle}>Другая платформа?</p>
          {platform === "ios" ? (
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.altLink}
            >
              <FaAndroid size={16} /> Скачать для Android
            </a>
          ) : (
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.altLink}
            >
              <FaApple size={16} /> Скачать для iOS
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Download;
