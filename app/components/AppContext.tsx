'use client';

import { SessionProvider } from "next-auth/react";

// Corrected AppProvider Component
export default function AppProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
