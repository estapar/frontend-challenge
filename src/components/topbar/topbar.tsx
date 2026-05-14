"use client";

import { useRouter } from "next/navigation";
import {
  LogOut,
  User,
} from "lucide-react";

import {
  clearSession,
} from "@/src/features/auth/utils/session";

export function Topbar() {
  const router = useRouter();

  function handleLogout() {
    clearSession();
    router.replace("/");
  }

  return (
    <header
      className="
        flex h-20 items-center justify-end
        
        bg-white px-8
      "
    >
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-zinc-600">
          <User className="size-4" />

          <span className="text-sm font-medium">
            {'Roberto Freitas'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="
            flex items-center gap-2
            text-zinc-600 transition
            hover:text-zinc-900
          "
        >
          <LogOut className="size-4" />

          <span className="text-sm font-medium">
            Sair
          </span>
        </button>
      </div>
    </header>
  );
}
