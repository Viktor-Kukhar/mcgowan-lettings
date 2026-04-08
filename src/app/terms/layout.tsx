import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | McGowan Residential Lettings",
  description:
    "Terms of Service for the McGowan Residential Lettings website. Read our terms governing the use of this website and our property listings.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
