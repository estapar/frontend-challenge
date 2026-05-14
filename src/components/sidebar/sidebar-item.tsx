"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed?: boolean;
};

export function SidebarItem({
  href,
  icon,
  label,
  collapsed,
}: Props) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`
        group flex min-h-14 items-center gap-4 rounded-lg
        px-4 py-3 transition-colors duration-200
        ${isActive
          ? "bg-[#ECEDEF] text-zinc-950"
          : "text-zinc-700 hover:bg-zinc-100"
        }
        ${collapsed ? "justify-center px-0" : ""}
      `}
    >
      <span
        className={`
          shrink-0 transition-colors duration-200
          ${isActive
            ? "text-zinc-950"
            : "text-zinc-600 group-hover:text-zinc-800"
          }
        `}
      >
        {icon}
      </span>

      {!collapsed && (
        <span
          className={`
            text-[16px] font-medium transition-colors duration-200
            ${isActive
              ? "text-zinc-950"
              : "text-zinc-700"
            }
          `}
        >
          {label}
        </span>
      )}
    </Link>
  );
}
