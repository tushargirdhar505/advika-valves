import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import { BUSINESS_INFO } from "@/types/product";

export const metadata: Metadata = {
  metadataBase: new URL("https://advikavalves.com"),
  title: {
    default: "Advika Valves | Authorised Dealer of Flowsid Valves",
    template: "%s | Advika Valves"
  },
  description: "Advika Valves is an Authorised Dealer of Flowsid Valves. Explore our complete 78-product catalog of industrial stainless steel, cast iron, cast steel, forged, and polypropylene valves.",
  keywords: [
    "Advika Valves",
    "Flowsid Valves",
    "Authorised Dealer Flowsid",
    "Industrial Valves Delhi",
    "Chawri Bazar Valves",
    "Stainless Steel Ball Valves",
    "Butterfly Valves",
    "Check Valves",
    "Steam Traps",
    "Gate Valves",
    "Globe Valves",
    "Polypropylene Valves"
  ],
  authors: [{ name: "Advika Valves" }],
  creator: "Advika Valves",
  publisher: "Advika Valves",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://advikavalves.com",
    siteName: "Advika Valves",
    title: "Advika Valves | Authorised Dealer of Flowsid Valves",
    description: "Complete technical catalog of industrial valves from Flowsid, Connect (CE), and CPI. Request product specifications and availability.",
    images: [
      {
        url: "/images/logo-light.png",
        width: 1024,
        height: 512,
        alt: "Advika Valves — Authorised Dealer of Flowsid Valves",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "IndustrialBusiness",
    "name": BUSINESS_INFO.name,
    "description": "Authorised Dealer of Flowsid Valves supplying precision industrial valves across India.",
    "email": BUSINESS_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "831, Kucha Pati Ram, Sita Ram Bazaar, Chawri Bazar",
      "addressLocality": "Delhi",
      "postalCode": "110006",
      "addressCountry": "IN"
    },
    "telephone": BUSINESS_INFO.contacts[0].phone,
    "founder": {
      "@type": "Person",
      "name": BUSINESS_INFO.legalOwner
    },
    "employee": [
      {
        "@type": "Person",
        "name": BUSINESS_INFO.contacts[0].name,
        "jobTitle": BUSINESS_INFO.contacts[0].title
      },
      {
        "@type": "Person",
        "name": BUSINESS_INFO.contacts[1].name,
        "jobTitle": BUSINESS_INFO.contacts[1].title
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white">
        <Header />
        <main className="flex-1 w-full pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}
