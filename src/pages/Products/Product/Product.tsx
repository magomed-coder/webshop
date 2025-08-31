// ProductDetailScreen.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProductDetailScreen.module.css";

// Импортируем иконки для веб (используем react-icons)
import { AiOutlineShareAlt } from "react-icons/ai";
import {
  IoPricetagOutline,
  IoGiftOutline,
  IoDocumentTextOutline,
  IoInformationCircleOutline,
  IoChevronBack,
} from "react-icons/io5";
import { MdStars, MdCategory, MdInventory } from "react-icons/md";
import type { Product } from "types";
import { mockProducts } from "constants/data";
import { getCategoryTitle } from "lib/utils/category.utils";
import { formatPrice } from "lib/utils/formatters";
import ImageSwiper from "@components/ImageSwiper/ImageSwiper";

// Компонент кнопки "Назад"
const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.backButton} onClick={() => navigate(-1)}>
      <IoChevronBack size={24} />
    </button>
  );
};

const ProductDetailScreen = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Находим продукт по ID
    const allProducts = Object.values(mockProducts).flat();
    const foundProduct = allProducts.find((p) => p.id === parseInt(id || ""));
    setProduct(foundProduct || null);
  }, [id]);

  const handleShare = async () => {
    if (!product) return;

    const shareData = {
      title: product.name,
      text: product.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback для браузеров без поддержки Web Share API
        await navigator.clipboard.writeText(window.location.href);
        // alert("Ссылка скопирована в буфер обмена!");
      }
    } catch (error) {
      console.error("Ошибка при попытке поделиться:", error);
    }
  };

  if (!product) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  const categoryTitle = getCategoryTitle(product.category);

  return (
    <div className={styles.productDetailContainer}>
      <BackButton />

      <div className={styles.contentWrapper}>
        <ImageSwiper images={product.images} />

        <div className={styles.productContent}>
          <div className={styles.productInfoSection}>
            <h1 className={styles.productName}>{product.name}</h1>

            <div className={styles.pricingContainer}>
              <div className={styles.priceBlock}>
                <div className={styles.priceHeader}>
                  <IoPricetagOutline size={14} />
                  <span className={styles.priceLabel}>Цена</span>
                </div>
                <div className={styles.priceValue}>
                  {formatPrice(product.price)}₽
                </div>
              </div>

              <div className={styles.bonusBlock}>
                <div className={styles.bonusHeader}>
                  <IoGiftOutline size={14} />
                  <span className={styles.bonusLabel}>Ваш бонус</span>
                </div>
                <div className={styles.bonusValue}>
                  {formatPrice(product.referralBonus)}₽
                </div>
              </div>

              {product.extraBonus ? (
                <div className={styles.extraBonusBlock}>
                  <div className={styles.extraBonusHeader}>
                    <MdStars size={14} />
                    <span className={styles.extraBonusLabel}>
                      Бонус за акцию
                    </span>
                  </div>
                  <div className={styles.extraBonusValue}>
                    +{formatPrice(product.extraBonus)}₽
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className={styles.descriptionSection}>
            <div className={styles.sectionHeader}>
              <IoDocumentTextOutline size={20} />
              <h2 className={styles.sectionTitleText}>Описание</h2>
            </div>
            <p className={styles.productDescription}>{product.description}</p>
          </div>

          <div className={styles.productDetailsSection}>
            <div className={styles.sectionHeader}>
              <IoInformationCircleOutline size={20} />
              <h2 className={styles.sectionTitleText}>Детали</h2>
            </div>

            <div className={styles.detailsContainer}>
              <div className={styles.detailRow}>
                <div className={styles.detailItem}>
                  <MdCategory size={18} />
                  <span className={styles.detailLabelText}>Категория</span>
                </div>
                <span className={styles.detailValueText}>{categoryTitle}</span>
              </div>

              <div className={styles.detailDivider}></div>

              <div className={styles.detailRow}>
                <div className={styles.detailItem}>
                  <MdInventory size={18} />
                  <span className={styles.detailLabelText}>Наличие</span>
                </div>
                <div
                  className={`${styles.stockBadge} ${
                    product.inStock
                      ? styles.inStockBadge
                      : styles.outOfStockBadge
                  }`}
                >
                  <span
                    className={`${styles.stockText} ${
                      product.inStock
                        ? styles.inStockText
                        : styles.outOfStockText
                    }`}
                  >
                    {product.inStock ? "В наличии" : "Нет в наличии"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className={styles.shareActionButton} onClick={handleShare}>
        <AiOutlineShareAlt size={20} />
        <span className={styles.shareActionLabel}>Поделиться</span>
      </button>
    </div>
  );
};

export default ProductDetailScreen;
