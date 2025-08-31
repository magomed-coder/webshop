// src/components/products/FilterModal.tsx
import React from "react";
import styles from "./FilterModal.module.css";
import { Paragraph } from "@components/UI/Paragraph/Paragraph";
import { LOCATIONS } from "constants/main";
import type { FilterType } from "types";
import { Checkbox } from "@components/UI/Checkbox/Checkbox";
import { Switch } from "@components/UI/Switch/Switch";
import { RadioButton } from "@components/UI/RadioButton/RadioButton";
import { MdClose } from "react-icons/md";

const sortOptions = [
  { label: "По умолчанию", value: "default" },
  { label: "Цена по возрастанию", value: "price_asc" },
  { label: "Цена по убыванию", value: "price_desc" },
  { label: "Доп. бонус — по убыванию", value: "referral_desc" },
  { label: "Доп. бонус — по возрастанию", value: "referral_asc" },
];

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterType;
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>;
  applyFilters: () => void;
  resetFilters: () => void;
  selectedLocations: any[];
  onToggleLocation: (item: any) => void;
  onToggleSelectAll: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  applyFilters,
  resetFilters,
  selectedLocations,
  onToggleLocation,
  onToggleSelectAll,
}) => {
  // ESC для закрытия + блокируем скролл фона, пока открыт лист
  React.useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const [visible, setVisible] = React.useState(false);
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // Небольшая задержка для применения начальных стилей перед анимацией
      requestAnimationFrame(() => {
        setAnimate(true);
      });
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Фильтры"
        className={`${styles.modalContent} ${animate ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className={styles.grabber} />

        <div className={styles.modalHeader}>
          <h2>Фильтры</h2>

          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Закрыть"
          >
            <MdClose size={22} />
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* ========== Price section ========== */}
          <div className={styles.filterSection}>
            <Paragraph className={styles.sectionTitle}>Цена</Paragraph>
            <div className={styles.priceContainer}>
              <div className={styles.priceInputContainer}>
                <Paragraph variant="u500.15">От:</Paragraph>
                <input
                  type="number"
                  className={styles.input}
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((prev: any) => ({
                      ...prev,
                      minPrice: e.target.value,
                    }))
                  }
                  placeholder="Мин"
                />
              </div>
              <div className={styles.priceInputContainer}>
                <Paragraph variant="u500.15">До:</Paragraph>
                <input
                  type="number"
                  className={styles.input}
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev: any) => ({
                      ...prev,
                      maxPrice: e.target.value,
                    }))
                  }
                  placeholder="Макс"
                />
              </div>
            </div>
          </div>

          {/* ===== Locations ===== */}
          <div className={styles.filterSection}>
            <div className={styles.sheetHeader}>
              <Paragraph className={styles.sectionTitle}>Локации</Paragraph>
              <button
                onClick={onToggleSelectAll}
                className={styles.selectAllBtn}
              >
                <Paragraph variant="u500.14">
                  {selectedLocations.length === LOCATIONS.length
                    ? "Снять всё"
                    : "Выбрать всё"}
                </Paragraph>
              </button>
            </div>

            <div>
              {LOCATIONS.map((item) => {
                const checked = selectedLocations.some(
                  (s) => s.key === item.key
                );
                return (
                  <Checkbox
                    key={item.key}
                    label={item.label}
                    checked={checked}
                    onPress={() => onToggleLocation(item)}
                  />
                );
              })}
            </div>
          </div>

          {/* ===== Sorting ===== */}
          <div className={styles.filterSection}>
            <Paragraph className={styles.sectionTitle}>Сортировка</Paragraph>

            <div className={styles.radioGroup}>
              {sortOptions.map((option) => (
                <RadioButton
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  isSelected={filters.sortBy === option.value}
                  changed={(e) =>
                    setFilters((prev: any) => ({
                      ...prev,
                      sortBy: e.target.value,
                    }))
                  }
                />
              ))}
            </div>
          </div>

          {/* ===== Extra bonus switch ===== */}
          {/* Обрати внимание: твой Switch отдаёт e? или boolean? 
              Если boolean — меняем onToggle={(checked) => setFilters(...checked)} */}
          <div className={styles.filterSection}>
            <div className={styles.switchContainer}>
              <Paragraph className={styles.sectionTitle}>
                Только с доп. бонусом
              </Paragraph>
              <Switch
                isToggle={filters.withExtraBonus}
                onToggle={(e: any) =>
                  setFilters((prev: any) => ({
                    ...prev,
                    withExtraBonus: e?.target ? e.target.checked : !!e, // поддержка обоих вариантов
                  }))
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button
            className={`${styles.button} ${styles.resetButton}`}
            onClick={resetFilters}
          >
            <Paragraph variant="u500.15" className={styles.buttonText}>
              Сбросить
            </Paragraph>
          </button>
          <button
            className={`${styles.button} ${styles.applyButton}`}
            onClick={applyFilters}
          >
            <Paragraph variant="u500.15" className={styles.buttonText}>
              Применить
            </Paragraph>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
