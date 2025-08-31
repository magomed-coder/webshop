import React, { useState, useRef, useEffect } from "react";
import styles from "./ImageSwiper.module.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface ImageSwiperProps {
  data: string[];
  showArrows?: boolean;
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({
  data,
  showArrows = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
    </div>
  );
};

export default ImageSwiper;
