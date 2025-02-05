"use client";
import Link from "next/link";
import { Logo } from "..";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import {
  IconLayoutDashboard,
  IconFile,
  IconSettings,
  IconLogout,
  IconFileDots,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

const sidebarItems = [
  {
    icon: <IconLayoutDashboard />,
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <IconFile />,
    label: "Posts",
    link: "/dashboard/posts",
  },
  {
    icon: <IconSettings />,
    label: "Configuración",
    link: "/dashboard/settings",
  },
];

const sidebarBottomItems = [
  {
    icon: <IconLogout />,
    label: "Cerrar sesión",
    onClick: (logout) => logout(),
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <div className="w-64 bg-gray-800 text-white fixed h-full p-8">
      <Logo square className="text-lg" />
      <div className="flex flex-col gap-4 mt-8">
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            className={`flex items-center gap-2 p-2 rounded-lg ${
              item.link === pathname ? "bg-primary-500/20 text-white" : ""
            }`}
            href={item.link}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
        <div className="absolute bottom-8">
          {sidebarBottomItems.map((item) => (
            <div
              key={item.label}
              onClick={() =>
                item.onClick ? item.onClick(logout) : router.push(item.link)
              }
              className="w-full flex items-center gap-2 p-2 cursor-pointer select-none"
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
