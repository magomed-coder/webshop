import { DataTable } from "@/components/ui/DataTable";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import {
  FiDollarSign,
  FiCalendar,
  FiFileText,
  FiLink,
  FiCheckCircle,
  FiClock,
  FiX,
  FiArrowRight,
  FiCreditCard,
  FiInfo,
} from "react-icons/fi";

export default function Payments() {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  return (
    <div className="min-h-screen bg-gray-50/30 p-6 relative">
      {/* Заголовок страницы */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <FiCreditCard className="text-gray-600" />
          Управление выплатами
        </h1>
        <p className="text-gray-600 mt-1">
          Просмотр и управление всеми выплатами системы
        </p>
      </div>

      {/* Таблица */}
      <div className="overflow-hidden">
        <DataTable
          columns={paymentColumns}
          data={payments}
          onRowClick={setSelectedPayment}
        />
      </div>

      {/* Оверлей */}
      {selectedPayment && (
        <div
          className="fixed inset-0 bg-gray-900/40 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedPayment(null)}
        />
      )}

      {/* Сайдбар */}
      <div
        className={`fixed top-0 right-0 h-full w-[480px] bg-white border-l border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out shadow-2xl
          ${selectedPayment ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {selectedPayment && (
          <div className="h-full flex flex-col">
            {/* Заголовок сайдбара */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FiFileText className="text-gray-600" />
                  Детали выплаты
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  ID: #{selectedPayment.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
              >
                <FiX className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
              </button>
            </div>

            {/* Контент сайдбара */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Статус */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      selectedPayment.status === "paid"
                        ? "bg-gray-100 text-gray-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {selectedPayment.status === "paid" ? (
                      <FiCheckCircle />
                    ) : (
                      <FiClock />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Статус</p>
                    <p className="font-semibold text-gray-800">
                      {paymentStatusMap[selectedPayment.status]}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedPayment.amount} ₽
                  </p>
                  <p className="text-sm text-gray-500">Сумма выплаты</p>
                </div>
              </div>

              {/* Информация о выплате */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FiInfo className="text-gray-500" />
                  Информация о выплате
                </h3>

                <div className="grid gap-3">
                  <InfoItem
                    icon={<FiFileText />}
                    label="ID заказа"
                    value={`#${selectedPayment.orderId}`}
                  />
                  <InfoItem
                    icon={<FiLink />}
                    label="Share Link ID"
                    value={selectedPayment.shareLinkId.toString()}
                  />
                  <InfoItem
                    icon={<FiDollarSign />}
                    label="Сумма"
                    value={`${selectedPayment.amount} ₽`}
                    valueClassName="text-gray-800 font-semibold"
                  />
                  <InfoItem
                    icon={<FiCalendar />}
                    label="Создано"
                    value={new Date(selectedPayment.createdAt).toLocaleString(
                      "ru-RU"
                    )}
                  />
                </div>
              </div>

              {/* Действия */}
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Компонент для отображения информации в сайдбаре
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

export type PaymentStatus = "created" | "paid";

export const paymentStatusMap: Record<PaymentStatus, string> = {
  created: "К выплате",
  paid: "Выплачено",
};

export interface Payment {
  id: number;
  orderId: number;
  shareLinkId: number;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
}

/* ============================
   Мок-данные
============================ */

export const payments: Payment[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  orderId: 1000 + i,
  shareLinkId: 2000 + i,
  amount: 1500 + i * 10,
  status: ["created", "paid"][i % 2] as PaymentStatus,
  createdAt: new Date(Date.now() - i * 3600000).toISOString(),
}));

/* ============================
   Колонки с сдержанными цветами
============================ */

export const paymentColumns: ColumnDef<Payment, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 80,
  },
  {
    accessorKey: "orderId",
    header: "ID заказа",
    cell: ({ getValue }: CellContext<Payment, any>) => (
      <span className="text-gray-700 font-medium">#{getValue()}</span>
    ),
  },
  {
    accessorKey: "shareLinkId",
    header: "Share Link ID",
    cell: ({ getValue }: CellContext<Payment, any>) => (
      <span className="text-gray-600">{getValue()}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Сумма",
    cell: ({ getValue }: CellContext<Payment, any>) => (
      <div className="flex items-center gap-2">
        <FiDollarSign className="text-gray-500 w-4 h-4" />
        <span className="font-semibold text-gray-900">{getValue()} ₽</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Статус",
    enableGlobalFilter: true,
    cell: ({ getValue }: CellContext<Payment, PaymentStatus>) => {
      const status = getValue();
      const isPaid = status === "paid";

      return (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${
            isPaid
              ? "bg-gray-50 text-gray-700 border-gray-300"
              : "bg-gray-50 text-gray-700 border-gray-300"
          }`}
        >
          {isPaid ? (
            <FiCheckCircle className="w-4 h-4" />
          ) : (
            <FiClock className="w-4 h-4" />
          )}
          {paymentStatusMap[status]}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Создано",
    cell: ({ getValue }: CellContext<Payment, any>) => (
      <div className="flex items-center gap-2 text-gray-600">
        <FiCalendar className="w-4 h-4" />
        {new Date(getValue()).toLocaleString("ru-RU")}
      </div>
    ),
  },
];
