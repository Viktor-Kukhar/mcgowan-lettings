import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mcgowanlettings.co.uk"),
  title: "McGowan Residential Lettings | Premium Lettings in Greater Manchester",
  description:
    "McGowan Residential Lettings — professional letting agents covering Bolton, Bury, Manchester & Rossendale. Find your perfect rental property or let your investment with confidence.",
  openGraph: {
    title: "McGowan Residential Lettings | Greater Manchester",
    description:
      "Professional letting agents covering Bolton, Bury, Manchester & Rossendale. Find your perfect rental property or let your investment with confidence.",
    url: "https://mcgowanlettings.co.uk",
    siteName: "McGowan Residential Lettings",
    type: "website",
    images: [{ url: "/hero.jpg", width: 1200, height: 630, alt: "McGowan Residential Lettings — Greater Manchester" }],
  },
  twitter: { card: "summary_large_image", images: ["/hero.jpg"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "McGowan Residential Lettings Ltd.",
              url: "https://mcgowanlettings.co.uk",
              logo: "https://mcgowanlettings.co.uk/mcgowan-logo.png",
              telephone: "0161 797 6967",
              email: "info@mcgowanlettings.co.uk",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bury",
                addressRegion: "Greater Manchester",
                addressCountry: "GB",
              },
              areaServed: [
                "Bury", "Bolton", "Manchester", "Rossendale", "Accrington", "Burnley",
              ],
              sameAs: [
                "https://wa.me/447457428720",
              ],
            }),
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
