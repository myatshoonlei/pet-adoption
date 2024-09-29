"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Check if the path includes "login" or "signup", and don't show navbar if true
  const showNavbar = !["/login", "/signup"].includes(pathname);

  return (
    <SessionProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="max-w-3xl mx-auto p-4">
            <div className="mt-8">{children}</div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
