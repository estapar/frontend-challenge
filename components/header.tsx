import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { LuUser, LuLogOut } from "react-icons/lu";

export const HeaderApp = () => {
  const router = useRouter();
  const removeToken = () => {
    authService.removeToken();
    router.push("/");
  };
  return (
    <header className="flex items-center justify-end  bg-white px-6 py-4">
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <LuUser size={16} />
          <span>Roberto Freitas</span>
        </div>

        <button
          onClick={removeToken}
          className="flex items-center gap-2 text-gray-600 transition-colors hover:text-red-500 cursor-pointer"
        >
          <LuLogOut size={16} />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
};
