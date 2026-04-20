import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Property Valuation | McGowan Residential Lettings",
  description:
    "Get a free, no-obligation rental valuation for your property in Greater Manchester. Find out what your property could earn.",
  alternates: { canonical: "/valuation" },
};

export default function ValuationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
