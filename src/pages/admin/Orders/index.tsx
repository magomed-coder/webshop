import { DataTable } from "@/components/ui/DataTable";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import {
  FiUser,
  FiPhone,
  FiPackage,
  FiDollarSign,
  FiGift,
  FiCalendar,
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

// ===============================
//   MAIN PAGE
// ===============================

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleCloseSidebar = () => setSelectedOrder(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <FiShoppingBag className="text-gray-500" />
          Управление заказами
        </h1>
        <p className="text-gray-600 mt-1">
          Просмотр и управление всеми заказами системы
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <DataTable
          columns={orderColumns}
          data={orders}
          onRowClick={setSelectedOrder}
        />
      </div>

      {/* Overlay */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-gray-900/30 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[480px] bg-white border-l border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out shadow-xl
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

// ===============================
//   SIDEBAR CONTENT
// ===============================

function OrderSidebarContent({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FiShoppingBag className="text-gray-500" />
            Детали заказа
          </h2>
          <p className="text-sm text-gray-600 mt-1">ID: #{order.id}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
        >
          <FiX className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <OrderStatusSection order={order} />
        <OrderInfoSection order={order} />
        <OrderActionsSection />
      </div>
    </div>
  );
}

// ===============================
//   STATUS SECTION
// ===============================

function OrderStatusSection({ order }: { order: Order }) {
  const statusStyles = {
    success: "text-green-700",
    failed: "text-red-700",
    in_progress: "text-blue-700",
    pending: "text-gray-700",
    pending_payment: "text-gray-700",
    paid_out: "text-purple-700",
  };

  const statusIcons = {
    success: <FiCheckCircle className="w-5 h-5" />,
    failed: <FiAlertCircle className="w-5 h-5" />,
    in_progress: <FiTrendingUp className="w-5 h-5" />,
    pending: <FiClock className="w-5 h-5" />,
    pending_payment: <FiClock className="w-5 h-5" />,
    paid_out: <FiCheckCircle className="w-5 h-5" />,
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-gray-100 text-gray-600">
          {statusIcons[order.status]}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Статус</p>
          <p className={`font-semibold ${statusStyles[order.status]}`}>
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

// ===============================
//   INFO SECTION
// ===============================

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
          value={String(order.shareLinkId)}
        />
        <InfoItem
          icon={<FiDollarSign />}
          label="Сумма"
          value={`${order.amount} ₽`}
        />
        <InfoItem
          icon={<FiGift />}
          label="Реферальная награда"
          value={`${order.referralReward} ₽`}
        />
        <InfoItem
          icon={<FiCalendar />}
          label="Создано"
          value={new Date(order.createdAt).toLocaleString("ru-RU")}
        />
        <InfoItem
          icon={order.payoutPaid ? <FiCheckCircle /> : <FiClock />}
          label="Выплата"
          value={order.payoutPaid ? "Выплачено" : "Ожидает"}
        />
      </div>
    </div>
  );
}

// ===============================
//   ACTIONS SECTION
// ===============================

function OrderActionsSection() {
  return (
    <div className="space-y-3 pt-4 border-t border-gray-200">
      <SidebarButton label="Связаться с клиентом" />
      <SidebarButton label="Посмотреть детали продукта" />
      <SidebarButton label="Скачать документы" />
    </div>
  );
}

function SidebarButton({ label }: { label: string }) {
  return (
    <button className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200">
      <span className="font-medium">{label}</span>
      <FiArrowRight className="w-4 h-4" />
    </button>
  );
}

// ===============================
//   INFO ITEM
// ===============================

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg text-gray-600 shadow-sm border border-gray-200">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <span className="text-sm text-gray-900">{value}</span>
    </div>
  );
}

// ===============================
//   TYPES & MOCKS
// ===============================

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

export const orders: Order[] = Array.from({ length: 40 }, (_, i) => ({
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
  ][i % 6] as OrderStatus,
  payoutPaid: i % 2 === 0,
  createdAt: new Date(Date.now() - i * 3600000).toISOString(),
}));

// ===============================
//   TABLE COLUMNS
// ===============================

export const orderColumns: ColumnDef<Order, any>[] = [
  { accessorKey: "id", header: "ID", size: 80 },

  {
    accessorKey: "name",
    header: "Имя клиента",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2 text-gray-900">
        <FiUser className="text-gray-500 w-4 h-4" />
        <span className="font-medium">{getValue()}</span>
      </div>
    ),
  },

  {
    accessorKey: "phone",
    header: "Телефон",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2 text-gray-600">
        <FiPhone className="text-gray-500 w-4 h-4" />
        {getValue()}
      </div>
    ),
  },

  {
    accessorKey: "amount",
    header: "Сумма",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2 text-gray-900">
        <FiDollarSign className="text-gray-500 w-4 h-4" />
        <span className="font-semibold">{getValue()} ₽</span>
      </div>
    ),
  },

  {
    accessorKey: "referralReward",
    header: "Реф. награда",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2 text-gray-900">
        <FiGift className="text-gray-500 w-4 h-4" />
        <span>{getValue()} ₽</span>
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ getValue }) => {
      const status = getValue() as OrderStatus;

      const colorClasses = {
        success: "bg-green-100 text-green-700 border-green-200",
        failed: "bg-red-100 text-red-700 border-red-200",
        in_progress: "bg-blue-100 text-blue-700 border-blue-200",
        paid_out: "bg-[#E4EBEE] text-[#4A6670] border-[#CCD5D9]",
        pending: "bg-gray-100 text-gray-700 border-gray-300",
        pending_payment: "bg-gray-100 text-gray-700 border-gray-300",
      };

      const icons = {
        success: <FiCheckCircle className="w-4 h-4" />,
        failed: <FiAlertCircle className="w-4 h-4" />,
        in_progress: <FiTrendingUp className="w-4 h-4" />,
        pending: <FiClock className="w-4 h-4" />,
        pending_payment: <FiClock className="w-4 h-4" />,
        paid_out: <FiCheckCircle className="w-4 h-4" />,
      };

      return (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${colorClasses[status]}`}
        >
          {icons[status]}
          {orderStatusMap[status]}
        </div>
      );
    },

    // enableGlobalFilter: true, // включаем глобальный поиск для колонки
    // filterFn: (
    //   row: Row<Order>, // row таблицы с generic Order
    //   columnId: string, // id колонки
    //   filterValue: string // что ввели в поиске
    // ): boolean => {
    //   const value = row.getValue(columnId) as OrderStatus;
    //   const statusText = orderStatusMap[value].toLowerCase();
    //   return statusText.includes(filterValue.toLowerCase());
    // },
  },

  {
    accessorKey: "payoutPaid",
    header: "Выплата",
    cell: ({ getValue }) => {
      const paid = getValue();
      return (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${
            paid
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-gray-100 text-gray-700 border-gray-300"
          }`}
        >
          {paid ? (
            <FiCheckCircle className="w-4 h-4" />
          ) : (
            <FiClock className="w-4 h-4" />
          )}
          {paid ? "Выплачено" : "Ожидает"}
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Создано",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2 text-gray-600">
        <FiCalendar className="w-4 h-4" />
        {new Date(getValue()).toLocaleString("ru-RU")}
      </div>
    ),
  },
];
