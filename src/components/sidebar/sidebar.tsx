"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Building2,
  Car,
  ChevronLeft,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";

export function Sidebar() {
  const [collapsed, setCollapsed] =
    useState(() => {
      if (typeof window === "undefined") {
        return false;
      }

      const storedValue =
        localStorage.getItem("sidebar-collapsed");

      return storedValue
        ? JSON.parse(storedValue)
        : false;
    });

  return (
    <aside
      className={`
        relative flex min-h-screen flex-col
        border-r border-zinc-200 bg-[#F4F5F6]
        transition-all duration-300
        ${collapsed ? "w-20" : "w-[272px]"}
      `}
    >

      <div className="flex h-22 items-center px-6">
        <Link href="/dashboard">
          <Image
            src={collapsed ? "/logo-min.png" : "/logo.png"}
            alt="Estapar"
            width={collapsed ? 40 : 140}
            height={32}
            className="h-auto "
          />
        </Link>
      </div>

      <div className="border-t border-zinc-200" />

      <nav className="flex flex-col gap-2 pt-4">
        <SidebarItem
          href="/garages"
          icon={<Building2 />}
          label="Garagens"
          collapsed={collapsed}
        />

        <SidebarItem
          href="/plans"
          icon={<Car />}
          label="Mensalistas"
          collapsed={collapsed}
        />
      </nav>

      <button
        onClick={() => {
          const nextValue = !collapsed;

          setCollapsed(nextValue);

          localStorage.setItem(
            "sidebar-collapsed",
            JSON.stringify(nextValue)
          );
        }}
        className="
          absolute right-[-16px] top-18
          flex size-8 items-center justify-center
          rounded-full border bg-[#F4F5F6] shadow-sm
        "
      >
        <ChevronLeft
          className={`
            size-4 transition-transform 
            ${collapsed ? "rotate-180" : ""}
          `}
        />
      </button>
    </aside>
  );
}
