import { AppButton } from "@/components/app-button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Página não encontrada
        </h2>

        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Desculpe, não conseguimos encontrar a página que você está procurando.
        </p>

        <Link href="/">
          <AppButton className="p-10 text-xl">Voltar ao Início</AppButton>
        </Link>
      </div>
    </div>
  );
}
