import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const body = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "500", variable: "--font-ibm-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://twobucklawncare.com"),
  title: "Two Buck Lawn Care | Premium Landscaping in the Farmington Valley, CT",
  description:
    "Premium landscaping, mulch, lawn mowing, planting, cleanups and junk removal across the Farmington Valley, Connecticut.",
  icons: { icon: "/images/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Two Buck Lawn Care | Premium Landscaping in the Farmington Valley, CT",
    description: "We transform ordinary properties into beautiful outdoor spaces. Free estimates.",
    url: "/",
    siteName: "Two Buck Lawn Care",
    images: [{ url: "/images/tblc/front-landscape.jpeg", width: 1000, height: 750, alt: "Two Buck Lawn Care landscape installation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Two Buck Lawn Care | Premium Landscaping in the Farmington Valley, CT",
    description: "Premium landscaping, lawn care and property cleanups in Connecticut.",
    images: ["/images/tblc/front-landscape.jpeg"],
  },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LandscapingBusiness",
  name: "Two Buck Lawn Care",
  image: "https://twobucklawncare.com/images/tblc/front-landscape.jpeg",
  url: "https://twobucklawncare.com/",
  telephone: "+12034417687",
  priceRange: "$$",
  address: { "@type": "PostalAddress", addressRegion: "CT", addressCountry: "US" },
  areaServed: { "@type": "Place", name: "Farmington Valley, Connecticut" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      </body>
    </html>
  );
}
