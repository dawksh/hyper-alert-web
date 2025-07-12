import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import ProviderLayout from "@/components/shared/ProviderLayout";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "perp alert",
  description: "perp alert | alerts for perps via calls",
  openGraph: {
    title: "perp alert",
    description: "perp alert | alerts for perps via calls",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "perp alert logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "perp alert",
    description: "perp alert | alerts for perps via calls",
    images: [
      {
        url: "/og.svg",
        alt: "perp alert logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} antialiased`}
      >
        <ProviderLayout>
          <Navbar />
          {children}
          <Toaster richColors />
        </ProviderLayout>
      </body>
    </html>
  );
}
