import { Loader } from "@/components/shared/Loader";
import { STORAGE_KEYS } from "@/constants/main";
import { usePublicRedirect } from "@/hooks/useQueries";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const ProductRedirect = () => {
  const { referralCode } = useParams<{ referralCode: string }>();
  const navigate = useNavigate();

  // Отключаем запрос если нет кода
  const { data, isLoading, error } = usePublicRedirect(
    referralCode || "",
    !!referralCode,
  );

  // Обработка побочных эффектов в useEffect
  useEffect(() => {
    // Если нет реферального кода - редирект на главную
    if (!referralCode) {
      navigate("/", { replace: true });
      return;
    }

    // Сохраняем код сразу при наличии
    localStorage.setItem(STORAGE_KEYS.REFERRAL_CODE, referralCode);

    // Обработка ошибки
    if (error) {
      console.error("Ошибка при получении данных редиректа:", error);
      navigate("/", { replace: true });
      return;
    }

    // Успешный редирект на продукт
    if (data) {
      navigate(`/product/${data.product_id}`, {
        state: { referralCode: data.referral_code },
        replace: true,
      });
    }
  }, [referralCode, data, error, navigate]);

  // Показываем лоадер только если есть код и идет загрузка
  if (referralCode && isLoading) {
    return <Loader size={80} border={8} />;
  }

  return null;
};

export default ProductRedirect;
