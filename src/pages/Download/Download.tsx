import React, { useEffect, useState } from "react";
import { FaApple, FaAndroid } from "react-icons/fa";
import { motion } from "framer-motion";
import { getMobileOS } from "@/lib/utils/getMobileOS";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/main";

// Анимационные варианты
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: 0.4 },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

const Download: React.FC = () => {
  const platform = getMobileOS();
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const redirectTimer = setTimeout(() => {
      window.location.href =
        platform === "ios" ? APP_STORE_URL : GOOGLE_PLAY_URL;
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [platform]);

  const handleDownload = () => {
    window.location.href = platform === "ios" ? APP_STORE_URL : GOOGLE_PLAY_URL;
  };

  const isIOS = platform === "ios";

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
      >
        {/* Иконка платформы с анимацией */}
        <motion.div variants={itemVariants} className="mb-6 text-center">
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="w-20 h-20 mx-auto bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-inner"
          >
            {isIOS ? (
              <FaApple size={40} className="text-gray-700" />
            ) : (
              <FaAndroid size={40} className="text-green-600" />
            )}
          </motion.div>
        </motion.div>

        {/* Заголовок */}
        <motion.h1
          variants={itemVariants}
          className="text-2xl font-semibold text-center text-gray-900 mb-2"
        >
          {isIOS ? "Скачать из App Store" : "Скачать APK для Android"}
        </motion.h1>

        {/* Описание */}
        <motion.p
          variants={itemVariants}
          className="text-gray-600 text-center text-sm mb-6"
        >
          {isIOS
            ? "Вы будете перенаправлены в App Store для загрузки приложения"
            : "Вы будете перенаправлены для загрузки APK файла"}
        </motion.p>

        {/* Таймер с анимацией */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-50 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              Автоматическое перенаправление
            </span>
            <motion.span
              key={timeLeft}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-sm font-medium text-gray-700"
            >
              {timeLeft} сек
            </motion.span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gray-400"
              initial={{ width: "100%" }}
              animate={{ width: `${(timeLeft / 5) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Основная кнопка */}
        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          onClick={handleDownload}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 mb-4 flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{
              scale: 2,
              opacity: 0.2,
              transition: { duration: 0.4 },
            }}
            style={{ borderRadius: "50%" }}
          />
          {isIOS ? (
            <>
              <FaApple size={18} />
              <span>Открыть App Store</span>
            </>
          ) : (
            <>
              <FaAndroid size={18} />
              <span>Скачать APK</span>
            </>
          )}
        </motion.button>

        {/* Альтернативная ссылка */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-gray-400 text-xs mb-2">Другая платформа?</p>
          <motion.a
            href={isIOS ? GOOGLE_PLAY_URL : APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            {isIOS ? (
              <>
                <FaAndroid size={14} />
                <span>Скачать для Android</span>
              </>
            ) : (
              <>
                <FaApple size={14} />
                <span>Скачать для iOS</span>
              </>
            )}
          </motion.a>
        </motion.div>

        {/* Нижняя информация */}
        <motion.div
          variants={itemVariants}
          className="mt-6 pt-4 border-t border-gray-100"
        >
          <motion.div
            className="flex justify-center gap-4 text-xs text-gray-400"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.5 },
              },
            }}
          >
            {["Безопасно", "Официальная версия", "Бесплатно"].map((text) => (
              <motion.span
                key={text}
                variants={{
                  hidden: { opacity: 0, y: 5 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {text}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Download;
