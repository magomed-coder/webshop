import { DataTable } from "@/components/ui/DataTable";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import {
  FiUser,
  FiPhone,
  FiPackage,
  FiDollarSign,
  FiGift,
  FiCalendar,
  FiFileText,
  FiLink,
  FiCheckCircle,
  FiClock,
  FiX,
  FiArrowRight,
  FiShoppingBag,
  FiInfo,
  FiAlertCircle,
  FiTrendingUp,
} from "react-icons/fi";

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleCloseSidebar = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50/30 p-6 relative">
      {/* Заголовок страницы */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <FiShoppingBag className="text-gray-600" />
          Управление заказами
        </h1>
        <p className="text-gray-600 mt-1">
          Просмотр и управление всеми заказами системы
        </p>
      </div>

      {/* Таблица */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <DataTable
          columns={orderColumns}
          data={orders}
          onRowClick={setSelectedOrder}
        />
      </div>

      {/* Оверлей */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-gray-900/40 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Сайдбар */}
      <div
        className={`fixed top-0 right-0 h-full w-[480px] bg-white border-l border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out shadow-2xl
          ${selectedOrder ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {selectedOrder && (
          <OrderSidebarContent
            order={selectedOrder}
            onClose={handleCloseSidebar}
          />
        )}
      </div>
    </div>
  );
}

// Компонент содержимого сайдбара
function OrderSidebarContent({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  return (
    <div className="h-full flex flex-col">
      {/* Заголовок сайдбара */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FiShoppingBag className="text-gray-600" />
            Детали заказа
          </h2>
          <p className="text-sm text-gray-600 mt-1">ID: #{order.id}</p>
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
        {/* Статус и сумма */}
        <OrderStatusSection order={order} />

        {/* Информация о заказе */}
        <OrderInfoSection order={order} />

        {/* Действия */}
        <OrderActionsSection onClose={onClose} />
      </div>
    </div>
  );
}

function OrderStatusSection({ order }: { order: Order }) {
  const getStatusIcon = () => {
    switch (order.status) {
      case "success":
        return <FiCheckCircle className="w-5 h-5" />;
      case "failed":
        return <FiAlertCircle className="w-5 h-5" />;
      case "in_progress":
        return <FiTrendingUp className="w-5 h-5" />;
      default:
        return <FiClock className="w-5 h-5" />;
    }
  };

  const getStatusColor = () => {
    switch (order.status) {
      case "success":
        return "text-green-700";
      case "failed":
        return "text-red-700";
      case "in_progress":
        return "text-blue-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-gray-100 text-gray-600">
          {getStatusIcon()}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Статус</p>
          <p className={`font-semibold ${getStatusColor()}`}>
            {orderStatusMap[order.status]}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-gray-900">{order.amount} ₽</p>
        <p className="text-sm text-gray-500">Сумма заказа</p>
      </div>
    </div>
  );
}

function OrderInfoSection({ order }: { order: Order }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <FiInfo className="text-gray-500" />
        Информация о заказе
      </h3>

      <div className="grid gap-3">
        <InfoItem icon={<FiUser />} label="Имя клиента" value={order.name} />
        <InfoItem icon={<FiPhone />} label="Телефон" value={order.phone} />
        <InfoItem
          icon={<FiPackage />}
          label="ID продукта"
          value={`#${order.productId}`}
        />
        <InfoItem
          icon={<FiLink />}
          label="Share Link ID"
          value={order.shareLinkId.toString()}
        />
        <InfoItem
          icon={<FiDollarSign />}
          label="Сумма заказа"
          value={`${order.amount} ₽`}
          valueClassName="text-gray-800 font-semibold"
        />
        <InfoItem
          icon={<FiGift />}
          label="Реферальная награда"
          value={`${order.referralReward} ₽`}
          valueClassName="text-green-600 font-semibold"
        />
        <InfoItem
          icon={<FiCalendar />}
          label="Создано"
          value={new Date(order.createdAt).toLocaleString("ru-RU")}
        />
        <InfoItem
          icon={order.payoutPaid ? <FiCheckCircle /> : <FiClock />}
          label="Выплата"
          value={order.payoutPaid ? "Выплачено" : "Ожидает выплаты"}
          valueClassName={
            order.payoutPaid ? "text-green-600 font-semibold" : "text-gray-600"
          }
        />
      </div>
    </div>
  );
}

function OrderActionsSection({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-3 pt-4 border-t border-gray-200">
      <button className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 group border border-gray-200">
        <span className="font-medium">Связаться с клиентом</span>
        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
      <button className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 group border border-gray-200">
        <span className="font-medium">Посмотреть детали продукта</span>
        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
      <button className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 group border border-gray-200">
        <span className="font-medium">Скачать документы</span>
        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
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

// ORDERS

export type OrderStatus =
  | "pending"
  | "in_progress"
  | "failed"
  | "success"
  | "pending_payment"
  | "paid_out";

export const orderStatusMap: Record<OrderStatus, string> = {
  pending: "Клиент оставил заявку",
  in_progress: "Передано специалисту",
  failed: "Сделка не состоялась",
  success: "Сделка закрыта успешно",
  pending_payment: "Ожидает выплату",
  paid_out: "Выплачено исполнителю",
};

export interface Order {
  id: number;
  shareLinkId: number;
  name: string;
  phone: string;
  productId: number;
  amount: number;
  referralReward: number;
  status: OrderStatus;
  payoutPaid: boolean;
  createdAt: string;
}

// мок-данные
const orders: Order[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  shareLinkId: 100 + i,
  name: `Клиент ${i + 1}`,
  phone: `+7 900 100 ${String(i + 1).padStart(4, "0")}`,
  productId: 10 + (i % 4),
  amount: 1990 + i * 50,
  referralReward: 300,
  status: [
    "pending",
    "in_progress",
    "failed",
    "success",
    "pending_payment",
    "paid_out",
  ][i % 6] as Order["status"],
  payoutPaid: i % 2 === 0,
  createdAt: new Date(Date.now() - i * 3600000).toISOString(),
}));

// Колонки с улучшенным оформлением
export const orderColumns: ColumnDef<Order, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 80,
  },
  {
    accessorKey: "name",
    header: "Имя клиента",
    cell: ({ getValue }: CellContext<Order, any>) => (
      <div className="flex items-center gap-2">
        <FiUser className="text-gray-500 w-4 h-4" />
        <span className="font-medium text-gray-900">{getValue()}</span>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Телефон",
    cell: ({ getValue }: CellContext<Order, any>) => (
      <div className="flex items-center gap-2">
        <FiPhone className="text-gray-500 w-4 h-4" />
        <span className="text-gray-600">{getValue()}</span>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Сумма",
    cell: ({ getValue }: CellContext<Order, any>) => (
      <div className="flex items-center gap-2">
        <FiDollarSign className="text-gray-500 w-4 h-4" />
        <span className="font-semibold text-gray-900">{getValue()} ₽</span>
      </div>
    ),
  },
  {
    accessorKey: "referralReward",
    header: "Реферальная награда",
    cell: ({ getValue }: CellContext<Order, any>) => (
      <div className="flex items-center gap-2">
        <FiGift className="text-green-500 w-4 h-4" />
        <span className="font-semibold text-green-600">{getValue()} ₽</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Статус",
    enableGlobalFilter: true,
    cell: ({ getValue }: CellContext<Order, OrderStatus>) => {
      const status = getValue();
      const getStatusStyles = () => {
        switch (status) {
          case "success":
            return "bg-green-50 text-green-700 border-green-200";
          case "failed":
            return "bg-red-50 text-red-700 border-red-200";
          case "in_progress":
            return "bg-blue-50 text-blue-700 border-blue-200";
          case "paid_out":
            return "bg-purple-50 text-purple-700 border-purple-200";
          default:
            return "bg-gray-50 text-gray-700 border-gray-200";
        }
      };

      const getStatusIcon = () => {
        switch (status) {
          case "success":
            return <FiCheckCircle className="w-4 h-4" />;
          case "failed":
            return <FiAlertCircle className="w-4 h-4" />;
          case "in_progress":
            return <FiTrendingUp className="w-4 h-4" />;
          default:
            return <FiClock className="w-4 h-4" />;
        }
      };

      return (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles()}`}
        >
          {getStatusIcon()}
          {orderStatusMap[status]}
        </div>
      );
    },
    filterFn: (
      row: import("@tanstack/react-table").Row<Order>,
      columnId: string,
      filterValue: string
    ) => {
      const status = row.getValue<OrderStatus>(columnId);
      const text = orderStatusMap[status].toLowerCase();
      return text.includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "payoutPaid",
    header: "Выплата",
    cell: ({ getValue }: CellContext<Order, any>) => {
      const isPaid = getValue();
      return (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${
            isPaid
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-gray-50 text-gray-700 border-gray-200"
          }`}
        >
          {isPaid ? (
            <FiCheckCircle className="w-4 h-4" />
          ) : (
            <FiClock className="w-4 h-4" />
          )}
          {isPaid ? "Выплачено" : "Ожидает"}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Создано",
    cell: ({ getValue }: CellContext<Order, string>) => (
      <div className="flex items-center gap-2 text-gray-600">
        <FiCalendar className="w-4 h-4" />
        {new Date(getValue()).toLocaleString()}
      </div>
    ),
  },
];
