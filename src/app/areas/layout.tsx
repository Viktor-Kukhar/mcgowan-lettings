import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Area Guides | McGowan Residential Lettings",
  description:
    "Local area guides for renting across Greater Manchester. Discover Bury, Bolton, Manchester, Rossendale, and more.",
};

export default function AreasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
