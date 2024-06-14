import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Cultura de Segurança dos Alimentos",
  description: "Cultura de Segurança dos Alimentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
