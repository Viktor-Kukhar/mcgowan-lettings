import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | McGowan Residential Lettings",
  description:
    "Property news, rental market insights, and landlord tips from McGowan Residential Lettings in Greater Manchester.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
