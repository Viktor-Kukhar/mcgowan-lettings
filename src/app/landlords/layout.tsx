import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landlord Services | McGowan Residential Lettings",
  description:
    "Fully managed and let-only services for landlords across Greater Manchester. No let, no fee. No hidden charges. Over 25 years of experience in Bury, Bolton, Manchester and Rossendale.",
  alternates: { canonical: "/landlords" },
};

export default function LandlordsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
