import { cn } from "@/utils/cn";
import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaRegFolderOpen,
  FaUsers,
  FaFirstOrder,
  FaBagShopping,
} from "react-icons/fa6";

const NAV_ITEMS = [
  {
    name: "Users",
    href: "/admin/users",
    icon: FaUsers,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FaRegFolderOpen,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: FaBagShopping,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: FaFirstOrder,
  },
];

export const SideBar = () => {
  const router = useRouter();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white shadow-sm">
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-center border-b border-gray-200 px-4">
        <h1 className="text-xl font-bold text-gray-800">
          <span className="text-primary-500">Ecom</span>Admin
        </h1>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {NAV_ITEMS.map((item) => {
          const isActive = router.pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all",
                "hover:bg-primary-50 hover:text-primary-600",
                isActive ? "bg-primary-50 text-primary-600" : "text-gray-600"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="ml-3">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sign Out Section */}
      <div className="border-t border-gray-200 p-4">
        <Button
          onPress={() => signOut()}
          className="w-full justify-center"
          variant="light"
        >
          Sign Out
        </Button>
      </div>
    </aside>
  );
};
