// src/components/products/FilterModal.tsx
import React from "react";

import styles from "./FilterModal.module.css";
import { Paragraph } from "@components/UI/Paragraph/Paragraph";
import { LOCATIONS } from "constants/main";
import type { FilterType } from "types";
import { Checkbox } from "@components/UI/Checkbox/Checkbox";

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
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Фильтры</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
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

          {/* ========== Locations section ========== */}
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

          {/* ========== Sorting section ========== */}
          <div className={styles.filterSection}>
            <Paragraph className={styles.sectionTitle}>Сортировка</Paragraph>
            <div className={styles.radioGroup}>
              {sortOptions.map((option) => (
                <div
                  key={option.value}
                  className={styles.radioOption}
                  onClick={() =>
                    setFilters((prev: any) => ({
                      ...prev,
                      sortBy: option.value as any,
                    }))
                  }
                >
                  <div className={styles.radioCircle}>
                    {filters.sortBy === option.value && (
                      <div className={styles.selectedRadio} />
                    )}
                  </div>
                  <Paragraph variant="u400.15" className={styles.radioLabel}>
                    {option.label}
                  </Paragraph>
                </div>
              ))}
            </div>
          </div>

          {/* ========== Extra bonus switch ========== */}
          <div className={styles.filterSection}>
            <div className={styles.switchContainer}>
              <Paragraph className={styles.sectionTitle}>
                Только с доп. бонусом
              </Paragraph>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={filters.withExtraBonus}
                  onChange={(e) =>
                    setFilters((prev: any) => ({
                      ...prev,
                      withExtraBonus: e.target.checked,
                    }))
                  }
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        </div>

        {/* ========== Action buttons ========== */}
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
