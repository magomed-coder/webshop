// src/pages/NotFound/NotFound.tsx
import { MdErrorOutline, MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { InfoScreen } from "@components/UI/InfoScreen";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <InfoScreen
      icon={<MdErrorOutline size={96} color="#9CA3AF" />}
      title="Страница не найдена"
      text="Похоже, вы перешли по неверной ссылке или страница была удалена."
      buttonLabel="На главную"
      buttonIcon={<MdHome size={20} />}
      // onButtonClick={() => navigate("/")}
      onButtonClick={() => navigate("/", { replace: true })}
    />
  );
}
