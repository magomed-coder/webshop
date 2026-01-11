// src/pages/ProductRedirect/ProductRedirect.tsx
import { Loader } from "@/components/shared/Loader";
import { STORAGE_KEYS } from "@/constants/main";
import { useReferralStore } from "@/contexts/referral.store";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductRedirect = () => {
  const { referralCode } = useParams<{ referralCode: string }>();
  const navigate = useNavigate();

  const {
    fetchPublicRedirect,
    isPublicRedirectLoading,
    // publicRedirectError,
    // clearPublicRedirect,
    // publicRedirectData,
  } = useReferralStore();

  useEffect(() => {
    if (!referralCode) {
      navigate("/", { replace: true });
      return;
    }

    const sendReferralAndRedirect = async () => {
      try {
        const res = await fetchPublicRedirect(referralCode);

        localStorage.setItem(STORAGE_KEYS.REFERRAL_CODE, referralCode);

        // Переходим с передачей state
        navigate(`/product/${res.product_id}`, {
          state: { referralCode: res.referral_code },
          replace: true, // чтобы не оставалось в истории
        });
      } catch (err) {
        console.error("Ошибка при редиректе:", err);

        navigate("/", { replace: true });
      } finally {
        // setLoading(false);
      }
    };

    sendReferralAndRedirect();
  }, [referralCode, navigate]);

  if (isPublicRedirectLoading) {
    return <Loader size={80} border={8} />;
  }

  return null;
};

export default ProductRedirect;
