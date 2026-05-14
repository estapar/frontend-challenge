import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f4f5f6] px-4 py-10">
      <Image
        width={180}
        height={72}
        src="/logo.png"
        alt="Logo Estapar"
        priority
        className="mb-10 h-auto w-45"
      />

      <Card className="w-full max-w-[520px]">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-xl font-semibold text-zinc-900">
            Página não encontrada
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          <Image
            src="/assets/feedback/notfound.svg"
            alt="Página não encontrada"
            width={220}
            height={140}
            className="h-auto max-w-full"
          />

          <p className="max-w-md text-center text-sm leading-6 text-zinc-500">
            A rota acessada não existe ou não está disponível neste sistema.
          </p>

          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#7ad33e] text-white hover:bg-[#66c934]"
            >
              <Link href="/">Ir para Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
