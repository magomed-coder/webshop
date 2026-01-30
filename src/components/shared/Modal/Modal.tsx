import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  showCloseButton?: boolean;
  width?: string | number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  icon,
  showCloseButton = true,
  width = 400,
}) => {
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
            style={{ width }}
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
            {(title || icon || showCloseButton) && (
              <div className={styles.modalHeader}>
                {icon && <div className={styles.modalIcon}>{icon}</div>}
                {title && <h3 className={styles.modalTitle}>{title}</h3>}
                {showCloseButton && (
                  <button
                    className={styles.modalClose}
                    onClick={onClose}
                    aria-label="Закрыть"
                  >
                    <FiX size={22} />
                  </button>
                )}
              </div>
            )}
            <div className={styles.modalBody}>{children}</div>
            {footer && <div className={styles.modalFooter}>{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
