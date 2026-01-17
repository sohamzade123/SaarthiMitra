import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "SaarthiMitra - Safety First Transport",
  description: "Your trusted companion for safe journeys. Emergency assistance, verified drivers, and real-time safety features.",
  keywords: ["transport", "safety", "driver", "passenger", "emergency", "SOS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
