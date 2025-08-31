import { useEffect, useState, type FC } from "react";
import styles from "./ModalOverlay.module.css";
import { createPortal } from "react-dom";

interface ModalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ANIMATION_DURATION = 200;

export const ModalOverlay: FC<ModalOverlayProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setShouldRender(true);
    } else {
      document.body.style.overflow = "";

      const timer = setTimeout(() => {
        setShouldRender(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${!isOpen ? styles.fadeOut : ""}`}
      onClick={handleClick}
    >
      {children}
    </div>,
    document.getElementById("modals") as HTMLElement
  );
};
