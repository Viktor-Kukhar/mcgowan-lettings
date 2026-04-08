import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complaints Procedure | McGowan Residential Lettings",
  description:
    "Our complaints procedure. Learn how to raise a complaint with McGowan Residential Lettings and how we handle the resolution process.",
};

export default function ComplaintsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
