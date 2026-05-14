"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { createQueryClient } from "./react-query";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
