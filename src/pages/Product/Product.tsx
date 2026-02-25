// ProductDetailScreen.tsx
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./ProductDetailScreen.module.css";

import {
  IoPricetagOutline,
  IoDocumentTextOutline,
  IoInformationCircleOutline,
  IoCheckmarkCircleOutline,
  IoClose,
  IoCartOutline,
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
import Modal from "@/components/shared/Modal/Modal";

import type { CreateOrderDTO } from "@/types";
import { useCreateOrder, useProduct } from "@/hooks/useQueries";

const CONTACT_PHONE_KEY = "contact_phone";

const ProductDetailScreen = () => {
  const { productId } = useParams<{
    productId: string;
  }>();

  const location = useLocation();
  const referralCode = location.state?.referralCode as string | undefined;

  const { clear } = useReferral();

  const { product, isError, isLoading } = useProduct(Number(productId));

  const { mutate: createOrder } = useCreateOrder();

  const isMobile = useIsMobile();

  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [comment, setComment] = useState("");
  const [nameError, setNameError] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const handleSubmitOrder = async () => {
    setNameError(undefined);
    setPhoneError(undefined);
    const payload: CreateOrderDTO = {
      referral_code: referralCode ?? null,
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      comment: comment.trim(),
    };

    let hasError = false;
    if (!payload.customer_name) {
      setNameError("Укажите корректно имя");
      hasError = true;
    }
    if (!payload.customer_phone || payload.customer_phone.length < 10) {
      setPhoneError("Укажите корректный номер телефона");
      hasError = true;
    }
    if (hasError) return;

    try {
      await createOrder(payload);

      localStorage.setItem(CONTACT_PHONE_KEY, payload.customer_phone.trim());
      setIsSent(true);

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

      setModalMessage(errorMessage);
      setModalOpen(true);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value);
    setNameError(undefined);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerPhone(e.target.value);
    setPhoneError(undefined);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleContact = async () => {
    if (!product) return;
    if (!product.is_active) {
      setModalMessage("Продукта нет в наличии");
      setModalOpen(true);
      return;
    }
    setIsSent(false);
    setSheetOpen(true);
  };

  useEffect(() => {
    const savedPhone = localStorage.getItem("contact_phone");
    if (savedPhone) {
      setCustomerPhone(savedPhone);
    }
  }, []);

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (!product || isError) {
    return <div className={styles.loading}>Товар не найден</div>;
  }

  const categoryTitle = product.category_name;
  const nonMainImages = product.images.filter((img) => !img.is_main);
  const images =
    nonMainImages.length > 0
      ? nonMainImages.map((img) => img.image)
      : product.images.map((img) => img.image);

  return (
    <>
      <div className={styles.productDetailContainer}>
        <BackButton />
        <div className={styles.contentWrapper}>
          <ImageSwiper data={images} showArrows={!isMobile} />

          <div className={styles.productContent}>
            <div className={styles.productInfoSection}>
              <h1 className={styles.productName}>{product.title}</h1>

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
                      product.is_active
                        ? styles.inStockBadge
                        : styles.outOfStockBadge
                    }`}
                  >
                    <span
                      className={`${styles.stockText} ${
                        product.is_active
                          ? styles.inStockText
                          : styles.outOfStockText
                      }`}
                    >
                      {product.is_active ? "В наличии" : "Нет в наличии"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          icon={<IoCartOutline size={20} />}
          label="Оформить покупку"
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
                    error={nameError}
                    inputClassName={styles.phoneInput}
                  />

                  <Input
                    label="Ваш телефон (желательно привязанный к WhatsApp)"
                    placeholder="+7 (000) 000-00-00"
                    value={customerPhone}
                    onChange={handlePhoneChange}
                    error={phoneError}
                    inputClassName={styles.phoneInput}
                  />

                  <textarea
                    placeholder="Комментарий к заказу (необязательно)"
                    value={comment}
                    onChange={handleCommentChange}
                    className={styles.commentTextarea}
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
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Внимание"
        footer={<Button label="Понятно" onClick={() => setModalOpen(false)} />}
      >
        {modalMessage}
      </Modal>
    </>
  );
};

export default ProductDetailScreen;
