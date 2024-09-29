"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function RootLayoutClient({ children }) {
  return (
    <SessionProvider>
      <div className="max-w-3xl mx-auto p-4">
        <div className="mt-8">{children}</div>
      </div>
    </SessionProvider>
  );
}
