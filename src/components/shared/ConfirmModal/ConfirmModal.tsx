// components/shared/ConfirmModal.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

import styles from "./ConfirmModal.module.css";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  icon?: React.ReactNode;
  variant?: "danger" | "primary" | "warning";
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Понятно",
  cancelText = "Отмена",
  icon,
  variant = "danger",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          iconBg: "rgba(59, 130, 246, 0.08)",
          iconColor: "#3b82f6",
          buttonBg: "#3b82f6",
          buttonHover: "#2563eb",
        };
      case "warning":
        return {
          iconBg: "rgba(245, 158, 11, 0.08)",
          iconColor: "#f59e0b",
          buttonBg: "#f59e0b",
          buttonHover: "#d97706",
        };
      default: // danger
        return {
          iconBg: "rgba(239, 68, 68, 0.08)",
          iconColor: "#ef4444",
          buttonBg: "#ef4444",
          buttonHover: "#dc2626",
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modalWindow}
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              mass: 0.8,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              {icon && (
                <div
                  className={styles.modalIcon}
                  style={{
                    backgroundColor: variantStyles.iconBg,
                    color: variantStyles.iconColor,
                  }}
                >
                  {icon}
                </div>
              )}
              <h3 className={styles.modalTitle}>{title}</h3>
              <button
                className={styles.modalClose}
                onClick={onClose}
                aria-label="Закрыть"
              >
                <FiX size={22} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.modalText}>{description}</p>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={`${styles.modalButton} ${styles.modalButtonSecondary}`}
                onClick={onClose}
              >
                {cancelText}
              </button>
              <button
                className={`${styles.modalButton} ${styles.modalButtonPrimary}`}
                onClick={onConfirm}
                style={{
                  backgroundColor: variantStyles.buttonBg,
                  borderColor: variantStyles.buttonBg,
                }}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
