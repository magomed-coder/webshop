// ProductDetailScreen.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetailScreen.module.css";

import {
  IoPricetagOutline,
  IoDocumentTextOutline,
  IoInformationCircleOutline,
  IoMailOutline,
  IoCheckmarkCircleOutline,
  IoClose,
} from "react-icons/io5";
import { MdCategory, MdInventory } from "react-icons/md";
import type { Product } from "@/types";
import { mockProducts } from "@/constants/data";
import { getCategoryTitle } from "@/lib/utils/category.utils";
import { formatPrice } from "@/lib/utils/formatters";
import ImageSwiper from "@/components/ImageSwiper/ImageSwiper";
import { useIsMobile } from "@/hooks/useIsMobile";
import BackButton from "@/components/shared/BackButton/BackButton";

import { Sheet } from "react-modal-sheet";
import { Input } from "@/components/shared/Input";
import { useReferral } from "@/hooks/useReferral";
import { Button } from "@/components/shared/Button";

const CONTACT_PHONE_KEY = "contact_phone";

const ProductDetailScreen = () => {
  const { id } = useParams<{ id: string }>();
  // const location = useLocation();

  // Безопасно извлекаем state
  // const { code: referralCode, clear } = useReferral();
  const { clear } = useReferral();

  const isMobile = useIsMobile();

  const [product, setProduct] = useState<Product | null>(null);
  const [phone, setPhone] = useState("");

  const [isSheetOpen, setSheetOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    // Находим продукт по ID
    const allProducts = Object.values(mockProducts).flat();
    const foundProduct = allProducts.find((p) => p.id === parseInt(id || ""));
    setProduct(foundProduct || null);
  }, [id]);

  useEffect(() => {
    const savedPhone = localStorage.getItem("contact_phone");
    if (savedPhone) {
      setPhone(savedPhone);
    }
  }, []);

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setError(undefined);
  };

  const handleContact = async () => {
    if (!product) return;

    setIsSent(false);
    setSheetOpen(true);
  };

  const handleSubmit = () => {
    if (!phone.trim()) {
      setError("Введите номер телефона");
      return;
    }

    // const payload = {
    //   phone: phone,
    //   productId: product.id,
    //   category: product.category,
    //   referralCode: referralCode || null,
    // };

    // Здесь можно добавить логику отправки / связи
    setIsSent(true);
    localStorage.setItem(CONTACT_PHONE_KEY, phone.trim());

    // TODO: АПИ запрос на заказ
    setTimeout(() => {
      setSheetOpen(false);
      setIsSent(false);
      setPhone("");
    }, 2500);
  };

  if (!product) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  const categoryTitle = getCategoryTitle(product.category);

  return (
    <>
      <div className={styles.productDetailContainer}>
        <BackButton />
        <div className={styles.contentWrapper}>
          <ImageSwiper data={product.images} showArrows={!isMobile} />

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
                <IoInformationCircleOutline
                  size={20}
                  style={{ marginTop: "2px" }}
                />
                <h2 className={styles.sectionTitleText}>Детали</h2>
              </div>

              <div className={styles.detailsContainer}>
                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <MdCategory size={18} />
                    <span className={styles.detailLabelText}>Категория</span>
                  </div>
                  <span className={styles.detailValueText}>
                    {categoryTitle}
                  </span>
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
        <Button
          icon={<IoMailOutline size={20} />}
          label="Связаться"
          onClick={handleContact}
          className={styles.shareActionButton}
        />
      </div>

      {/* The Bottom Sheet Component */}
      <Sheet
        isOpen={isSheetOpen}
        onClose={() => setSheetOpen(false)}
        snapPoints={[0.5, 0.6, 0.7, 0.8, 0.9]}
        initialSnap={1}
      >
        <Sheet.Container>
          <Sheet.Header>
            <div className={styles.sheetHeader}>
              <span className={styles.sheetTitle}>Связаться</span>

              <button
                className={styles.closeIconButton}
                onClick={() => setSheetOpen(false)}
              >
                <IoClose size={22} />
              </button>
            </div>
          </Sheet.Header>

          <Sheet.Content>
            <div className={styles.sheetContent}>
              {!isSent ? (
                <>
                  <Input
                    label="Ваш телефон (желательно привязанный к WhatsApp)"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={handlePhoneChange}
                    error={error}
                    inputClassName={styles.phoneInput}
                  />

                  <Button
                    label="Отправить заявку"
                    onClick={handleSubmit}
                    className={styles.submitButton}
                  />
                </>
              ) : (
                <div className={styles.successMessage}>
                  <div className={styles.successCheckmark}>
                    <IoCheckmarkCircleOutline size={60} />
                  </div>
                  <div className={styles.successText}>
                    Заявка отправлена!
                    <br />
                    Мы скоро свяжемся.
                  </div>
                </div>
              )}
            </div>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop onTap={() => setSheetOpen(false)} />
      </Sheet>
    </>
  );
};

export default ProductDetailScreen;
