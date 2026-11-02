import type { Metadata, Viewport } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const manrope = Manrope({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "M. Rendi Adhitya Atmaja Putra — Operations & Digital Specialist",
  description:
    "Portfolio CV M. Rendi Adhitya Atmaja Putra — Operations & Digital Specialist | Technical Drafter. Gambar teknik, pengelolaan e-commerce, hingga pengembangan website.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "M. Rendi Adhitya Atmaja Putra",
    title: "M. Rendi Adhitya Atmaja Putra — Operations & Digital Specialist",
    description:
      "Portfolio CV M. Rendi Adhitya Atmaja Putra — Operations & Digital Specialist | Technical Drafter. Gambar teknik, pengelolaan e-commerce, hingga pengembangan website.",
    images: [
      {
        url: "/foto-diri.jpeg",
        width: 960,
        height: 1280,
        alt: "Foto M. Rendi Adhitya Atmaja Putra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "M. Rendi Adhitya Atmaja Putra — Operations & Digital Specialist",
    description:
      "Portfolio CV M. Rendi Adhitya Atmaja Putra — Operations & Digital Specialist | Technical Drafter.",
    images: ["/foto-diri.jpeg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
