// ProductDetailScreen.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

import { formatPrice } from "@/lib/utils/formatters";
import ImageSwiper from "@/components/ImageSwiper/ImageSwiper";
import { useIsMobile } from "@/hooks/useIsMobile";
import BackButton from "@/components/shared/BackButton/BackButton";

import { Sheet } from "react-modal-sheet";
import { Input } from "@/components/shared/Input";
import { useReferral } from "@/hooks/useReferral";
import { Button } from "@/components/shared/Button";
import { useCatalogStore } from "@/contexts/catalog.store";
import type { CreateOrderDTO } from "@/types";
import { useOrderStore } from "@/contexts/order.store";

const CONTACT_PHONE_KEY = "contact_phone";

const ProductDetailScreen = () => {
  // const { referralCode, productId } = useParams<{
  //   referralCode: string;
  //   productId: string;
  // }>();

  const location = useLocation();
  const { productId, referralCode } = location.state;

  console.log({ productId, referralCode });

  const navigate = useNavigate();

  const { clear } = useReferral();

  const { products, currentProduct, fetchProduct, clearCurrentProduct } =
    useCatalogStore();

  const { createOrder } = useOrderStore();

  const isMobile = useIsMobile();

  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | undefined>();

  const handleSubmitOrder = async () => {
    const payload: CreateOrderDTO = {
      referral_code: referralCode,
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      comment: comment.trim(),
    };

    // Минимальная валидация на фронте
    if (!payload.customer_name) {
      alert("Укажите корректно имя");
      return;
    }
    if (!payload.customer_phone || payload.customer_phone.length < 10) {
      alert("Укажите корректный номер телефона");
      return;
    }

    try {
      await createOrder(payload);

      localStorage.setItem(CONTACT_PHONE_KEY, payload.customer_phone.trim());

      setTimeout(() => {
        setSheetOpen(false);
        setIsSent(false);
        setCustomerName("");
        setCustomerPhone("");
        setComment("");
      }, 2500);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Не удалось отправить заявку. Попробуйте позже.";

      alert(errorMessage);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value);
    setError(undefined);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerPhone(e.target.value);
    setError(undefined);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    setError(undefined);
  };

  const handleContact = async () => {
    if (!currentProduct) return;

    setIsSent(false);
    setSheetOpen(true);
  };

  useEffect(() => {
    if (!productId) {
      navigate("/", { replace: true });
      return;
    }

    const prodId = Number(productId);

    // 1. Пытаемся найти в уже загруженных продуктах
    const cachedProduct = products.find((p) => p.id === prodId);

    if (cachedProduct) {
      // продукт уже есть — используем его
      useCatalogStore.setState({ currentProduct: cachedProduct });
      return;
    }

    // 2. Если нет — делаем запрос
    fetchProduct(prodId);

    // 3. cleanup
    return () => {
      clearCurrentProduct();
    };
  }, [productId, products]);

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

  if (!currentProduct) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  const categoryTitle = currentProduct.category_name;
  const images = currentProduct.images.map((img) => img.image);

  return (
    <>
      <div className={styles.productDetailContainer}>
        <BackButton />
        <div className={styles.contentWrapper}>
          <ImageSwiper data={images} showArrows={!isMobile} />

          <div className={styles.productContent}>
            <div className={styles.productInfoSection}>
              <h1 className={styles.productName}>{currentProduct.title}</h1>

              <div className={styles.pricingContainer}>
                <div className={styles.priceBlock}>
                  <div className={styles.priceHeader}>
                    <IoPricetagOutline size={14} />
                    <span className={styles.priceLabel}>Цена</span>
                  </div>
                  <div className={styles.priceValue}>
                    {formatPrice(currentProduct.price)}₽
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.descriptionSection}>
              <div className={styles.sectionHeader}>
                <IoDocumentTextOutline size={20} />
                <h2 className={styles.sectionTitleText}>Описание</h2>
              </div>
              <p className={styles.productDescription}>
                {currentProduct.description}
              </p>
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
                      currentProduct.is_active
                        ? styles.inStockBadge
                        : styles.outOfStockBadge
                    }`}
                  >
                    <span
                      className={`${styles.stockText} ${
                        currentProduct.is_active
                          ? styles.inStockText
                          : styles.outOfStockText
                      }`}
                    >
                      {currentProduct.is_active ? "В наличии" : "Нет в наличии"}
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
        snapPoints={[0, 0.8, 0.9, 1]}
        initialSnap={3}
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
                    label="Имя"
                    placeholder="Джон Доу"
                    value={customerName}
                    onChange={handleNameChange}
                    error={error}
                    inputClassName={styles.phoneInput}
                  />

                  <Input
                    label="Ваш телефон (желательно привязанный к WhatsApp)"
                    placeholder="+7 (000) 000-00-00"
                    value={customerPhone}
                    onChange={handlePhoneChange}
                    error={error}
                    inputClassName={styles.phoneInput}
                  />

                  <Input
                    label="Комментарий к заказу"
                    placeholder="Например: интересует доставка"
                    value={comment}
                    onChange={handleCommentChange}
                    inputClassName={styles.phoneInput}
                  />

                  <Button
                    label="Отправить заявку"
                    onClick={handleSubmitOrder}
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
