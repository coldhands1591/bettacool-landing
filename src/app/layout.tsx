import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "bettacool — บ้านของคนรักปลากัด | Home for Betta Fish Lovers",
  description:
    "แอปที่สร้างโดยคนเลี้ยงปลากัด เพื่อคนเลี้ยงปลากัด โพสต์ ประมูล ซื้อขาย แชท ไม่โดนแบน ไม่โดนปิด | The app built by betta lovers, for betta lovers.",
  keywords: [
    "ปลากัด",
    "betta fish",
    "ประมูลปลากัด",
    "ซื้อขายปลากัด",
    "ชุมชนปลากัด",
    "ปลากัดสวยงาม",
    "สายพันธุ์ปลากัด",
    "ปลากัดครีบสั้น",
    "ปลากัดครีบยาว",
    "ปลากัดป่า",
    "ปลากัดฮาฟมูน",
    "ปลากัดมงกุฎ",
    "เลี้ยงปลากัด",
    "ฟาร์มปลากัด",
    "betta community",
    "fish auction",
    "bettacool",
    "siamese fighting fish",
    "betta splendens",
    "betta marketplace",
  ],
  openGraph: {
    title: "bettacool — บ้านของคนรักปลากัด",
    description:
      "โพสต์ ประมูล ซื้อขาย แชท และแชร์ความรู้ ไม่โดนแบน ไม่โดนปิด",
    url: "https://bettacool.com",
    siteName: "bettacool",
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "bettacool — บ้านของคนรักปลากัด",
    description:
      "แอปสำหรับคนรักปลากัด โพสต์ ประมูล ซื้อขาย ไม่โดนแบน",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Thai:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "bettacool",
              operatingSystem: "iOS, Android",
              applicationCategory: "SocialNetworkingApplication",
              description:
                "Community app for betta fish enthusiasts. Post, auction, buy, sell, and chat.",
              url: "https://bettacool.com",
              author: {
                "@type": "Organization",
                name: "bettacool",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "THB",
              },
            }),
          }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
