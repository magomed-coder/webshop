import React, { useState, useCallback } from "react";
import styles from "./ImageSwiper.module.css";

const SWIPE_THRESHOLD = 50;

interface ImageSwiperProps {
  images: string[];
  showArrows?: boolean;
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({
  images,
  showArrows = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setSwipeDirection("right");

    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setSwipeDirection(null);
      setIsTransitioning(false);
    }, 300);
  }, [images.length, isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setSwipeDirection("left");

    setTimeout(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setSwipeDirection(null);
      setIsTransitioning(false);
    }, 300);
  }, [images.length, isTransitioning]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    setTouchStartX(null);
  };

  const goToImage = (index: number) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);
    setSwipeDirection(index > currentIndex ? "left" : "right");

    setTimeout(() => {
      setCurrentIndex(index);
      setSwipeDirection(null);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div
      className={styles.productImage}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.imageContainer}>
        <div
          className={`${styles.slider} ${
            swipeDirection ? styles[swipeDirection] : ""
          }`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.slide}>
              <img
                src={image}
                alt={`Product view ${index + 1}`}
                className={styles.mainImage}
              />
            </div>
          ))}
        </div>

        {showArrows
          ? images.length > 1 && (
              <>
                <button
                  className={styles.navButtonPrev}
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  className={styles.navButtonNext}
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )
          : null}
      </div>

      {images.length > 1 && (
        <div className={styles.imagePagination}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.paginationDot} ${
                index === currentIndex ? styles.activeDot : ""
              }`}
              onClick={() => goToImage(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSwiper;
