import type { Metadata } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-sans-devanagari",
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Hindi Typing Master | InScript Tutor",
  description: "Master Hindi InScript typing with our interactive lessons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className={`${notoSansDevanagari.variable}`}>
      <body className="antialiased min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
