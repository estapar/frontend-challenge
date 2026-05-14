import { Inter } from "next/font/google";
import { Providers } from "../lib/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Estapar B2B",
  description:
    "Maior rede de estacionamentos da America Latina e lider em mobilidade urbana no Brasil",
  icons: {
    icon: "/logo-min.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
