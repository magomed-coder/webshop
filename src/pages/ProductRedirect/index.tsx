// src/pages/ProductRedirect/ProductRedirect.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ProductRedirectResponse {
  categoryName: string;
  productId: string;
}

const ProductRedirect = () => {
  const { referralCode } = useParams<{ referralCode: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!referralCode) return;

    const sendReferralAndRedirect = async () => {
      try {
        // 1. Отправляем запрос на сервер
        const response = await fetch(
          `/api/referral?code=${encodeURIComponent(referralCode)}`
        );
        const data: ProductRedirectResponse = await response.json();

        // 2. Редирект на страницу продукта
        navigate(`/products/${data.categoryName}/${data.productId}`);
      } catch (err) {
        console.error("Ошибка при редиректе:", err);
        // Если ошибка — можно редиректить на главную
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    sendReferralAndRedirect();
  }, [referralCode, navigate]);

  if (loading) {
    return <div>Загрузка… Переходим к продукту...</div>;
  }

  return null;
};

export default ProductRedirect;
