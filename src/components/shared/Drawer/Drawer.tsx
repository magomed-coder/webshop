import { type FC } from "react";
import styles from "./Drawer.module.css";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Drawer: FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className={`${styles.drawer} ${!isOpen ? styles.closing : ""}`}>
        {children}
      </div>
    </ModalOverlay>
  );
};
