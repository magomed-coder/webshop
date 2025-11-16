// src/pages/ProductRedirect/ProductRedirect.tsx
import { Loader } from "@components/UI/Loader";
import { STORAGE_KEYS } from "constants/main";
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
    if (!referralCode) {
      navigate("/");
      return;
    }

    const sendReferralAndRedirect = async () => {
      try {
        // TODO: АПИ запрос на рефералку
        // /product-link/ABC123 XYZ789 TEST99
        // ЭМУЛЯЦИЯ ответа сервера (в реальности — fetch)
        await new Promise((resolve) => setTimeout(resolve, 800)); // имитация задержки

        localStorage.setItem(STORAGE_KEYS.REFERRAL_CODE, referralCode);

        // Пример: код "ABC123" → категория "real-estate", товар 105
        const mockResponse: Record<string, ProductRedirectResponse> = {
          ABC123: { categoryName: "real-estate", productId: "105" },
          XYZ789: { categoryName: "auto-parts", productId: "203" },
          TEST99: { categoryName: "perfume", productId: "512" },
          // Добавьте свои коды
        };

        const data = mockResponse[referralCode];

        // Переходим с передачей state
        navigate(`/products/${data.categoryName}/${data.productId}`, {
          state: { referralCode },
          replace: true, // чтобы не оставалось в истории
        });
      } catch (err) {
        console.error("Ошибка при редиректе:", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    sendReferralAndRedirect();
  }, [referralCode, navigate]);

  if (loading) {
    return <Loader size={80} border={8} />;
  }

  return null;
};

export default ProductRedirect;
