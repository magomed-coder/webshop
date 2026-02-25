import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ImageSwiper.module.css";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";

interface ImageSwiperProps {
  data: string[];
  showArrows?: boolean;
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({
  data,
  showArrows = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollLeft = containerRef.current.scrollLeft;
        const containerWidth = containerRef.current.offsetWidth;
        const index = Math.round(scrollLeft / containerWidth);

        setCurrentIndex(index);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Функция для перехода к определенному слайду
  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: index * containerWidth,
        behavior: "smooth",
      });
    }
  };

  // Обработчики для кнопок навигации
  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  // Модальное окно
  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  const handleModalPrev = useCallback(() => {
    setModalIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1));
  }, [data.length]);

  const handleModalNext = useCallback(() => {
    setModalIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0));
  }, [data.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") handleModalPrev();
      if (e.key === "ArrowRight") handleModalNext();
    },
    [handleModalNext, handleModalPrev, isModalOpen],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={styles.container}>
      <div ref={containerRef} className={styles.scrollContainer}>
        <div className={styles.slider}>
          {data.map((image, index) => (
            <div key={index} className={styles.slide}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className={styles.image}
                onClick={() => openModal(index)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки навигации */}
      {showArrows
        ? data.length > 1 && (
            <>
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <IoChevronBack size={24} style={{ marginLeft: "-4px" }} />
              </button>

              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={handleNext}
                disabled={currentIndex === data.length - 1}
              >
                <IoChevronForward size={24} style={{ marginLeft: "4px" }} />
              </button>
            </>
          )
        : null}

      {/* Индикаторы (точки) */}
      {data.length > 1 && (
        <div className={styles.dotsContainer}>
          {data.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === currentIndex ? styles.activeDot : ""
              }`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Модальное окно для полноэкранного просмотра */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className={styles.modalOverlay}
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                className={styles.modalClose}
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoClose size={28} />
              </motion.button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={modalIndex}
                  src={data[modalIndex]}
                  alt={`Full view ${modalIndex + 1}`}
                  className={styles.modalImage}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              {data.length > 1 && (
                <>
                  <motion.button
                    className={`${styles.modalNavButton} ${styles.modalPrevButton}`}
                    onClick={handleModalPrev}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transformTemplate={({ scale }) =>
                      `translateY(-50%) scale(${scale})`
                    }
                  >
                    <IoChevronBack size={32} />
                  </motion.button>

                  <motion.button
                    className={`${styles.modalNavButton} ${styles.modalNextButton}`}
                    onClick={handleModalNext}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transformTemplate={({ scale }) =>
                      `translateY(-50%) scale(${scale})`
                    }
                  >
                    <IoChevronForward size={32} />
                  </motion.button>

                  <motion.div
                    className={styles.modalCounter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    transformTemplate={({ y }) =>
                      `translateX(-50%) translateY(${y})`
                    }
                  >
                    {modalIndex + 1} / {data.length}
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageSwiper;
