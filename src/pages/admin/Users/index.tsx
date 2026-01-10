import { DataTable } from "@/components/ui/DataTable";
import type { User } from "@/contexts/useAuthStore";
import type { CellContext } from "@tanstack/react-table";

export default function Users() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Пользователи</h1>
      <DataTable columns={userColumns} data={users} />
    </div>
  );
}

// Мок-данные с обязательным полем username
const users: User[] = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  username: `user${i + 1}`, // теперь есть обязательное поле
  email: `user${i + 1}@mail.com`,
  phone: `+7 900 000 ${String(i + 1).padStart(4, "0")}`,
  role: ["user", "admin", "manager", "partner"][i % 4] as User["role"],
}));

const roleMap: Record<User["role"], string> = {
  user: "Пользователь",
  partner: "Партнёр",
  manager: "Менеджер",
  admin: "Админ",
};

export const userColumns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Имя",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Телефон",
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "role",
    header: "Роль",
    cell: ({ getValue }: CellContext<User, User["role"]>) => {
      const role = getValue();
      return roleMap[role];
    },
  },
];
