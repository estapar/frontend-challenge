"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { HeaderApp } from "@/components/header";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <AuthProvider>
        <HeaderApp />
        <SidebarProvider>
          <AppSidebar />
          {children}
          <ToastContainer />
        </SidebarProvider>
      </AuthProvider>
    </div>
  );
}
