"use client";

import Image from "next/image";
import { LoginForm } from "@/components/layout/LoginForm";

export function LoginPage() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="w-auto h-auto mb-14">
        <Image
          src="/estapar-logo.png"
          alt="Logo Estapar"
          width={300}
          height={300}
        />
      </div>
      <div className="box-border flex bg-white border-[1px] border-gray-200 rounded-lg shadow-md p-6 justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
