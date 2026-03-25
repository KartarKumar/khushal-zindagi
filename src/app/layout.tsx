import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const font = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Khushal Zindagi - Natural Men's Performance Oil | Pakistan",
  description:
    "Pakistan's #1 natural herbal performance oil for men. 100% herbal, lab tested, discreet delivery. Enhance stamina, confidence & vitality. Cash on Delivery available across Pakistan.",
  keywords:
    "men wellness oil, mardana taqat oil, herbal performance oil Pakistan, natural stamina oil, Khushal Zindagi",
  openGraph: {
    title: "Khushal Zindagi - Natural Performance Oil for Men",
    description:
      "100% herbal performance enhancement oil. Trusted by 50,000+ customers across Pakistan.",
    type: "website",
    locale: "en_PK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${font.variable} h-full`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col font-sans antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
