import {
  FiFileText,
  FiX,
  FiInfo,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiCalendar,
  FiLink,
} from "react-icons/fi";
import { paymentStatusMap, type Payment } from ".";
import { useState, useEffect } from "react";

interface PaymentSidebarProps {
  payment: Payment | null;
  onClose: () => void;
}

export function PaymentSidebar({ payment, onClose }: PaymentSidebarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (payment) {
      setShouldRender(true);
      // Небольшая задержка для начала анимации
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Ждем завершения анимации перед удалением из DOM
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [payment]);

  if (!shouldRender) return null;

  return (
    <>
      {/* Оверлей */}
      <div
        className={`fixed inset-0 bg-gray-900/40 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Сайдбар */}
      <div
        className={`fixed top-0 right-0 h-full w-[480px] bg-white border-l border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out shadow-2xl
          ${isVisible ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Заголовок сайдбара */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FiFileText className="text-gray-600" />
                Детали выплаты
              </h2>
              <p className="text-sm text-gray-600 mt-1">ID: #{payment!.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
            >
              <FiX className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
            </button>
          </div>

          {/* Контент сайдбара */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Статус */}
            <PaymentStatusSection payment={payment!} />

            {/* Информация о выплате */}
            <PaymentInfoSection payment={payment!} />

            {/* Действия */}
            <PaymentActionsSection />
          </div>
        </div>
      </div>
    </>
  );
}

function PaymentStatusSection({ payment }: { payment: Payment }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-gray-100 text-gray-600">
          {payment.status === "paid" ? <FiCheckCircle /> : <FiClock />}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Статус</p>
          <p className="font-semibold text-gray-800">
            {paymentStatusMap[payment.status]}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-gray-900">{payment.amount} ₽</p>
        <p className="text-sm text-gray-500">Сумма выплаты</p>
      </div>
    </div>
  );
}

function PaymentInfoSection({ payment }: { payment: Payment }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <FiInfo className="text-gray-500" />
        Информация о выплате
      </h3>

      <div className="grid gap-3">
        <InfoItem
          icon={<FiFileText />}
          label="ID заказа"
          value={`#${payment.orderId}`}
        />
        <InfoItem
          icon={<FiLink />}
          label="Share Link ID"
          value={payment.shareLinkId.toString()}
        />
        <InfoItem
          icon={<FiDollarSign />}
          label="Сумма"
          value={`${payment.amount} ₽`}
          valueClassName="text-gray-800 font-semibold"
        />
        <InfoItem
          icon={<FiCalendar />}
          label="Создано"
          value={new Date(payment.createdAt).toLocaleString("ru-RU")}
        />
      </div>
    </div>
  );
}

function PaymentActionsSection() {
  return (
    <div className="space-y-3 pt-4 border-t border-gray-200">
      <button className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 group border border-gray-200">
        <span className="font-medium">Перейти к заказу</span>
        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
      <button className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 group border border-gray-200">
        <span className="font-medium">Скачать чек</span>
        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
  valueClassName = "text-gray-900",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg text-gray-600 shadow-sm border border-gray-200">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <span className={`text-sm ${valueClassName}`}>{value}</span>
    </div>
  );
}
