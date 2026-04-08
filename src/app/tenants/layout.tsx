import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tenant Information | McGowan Residential Lettings",
  description:
    "Everything you need to know about renting with McGowan Residential Lettings. Move-in costs, responsibilities, FAQs and fees for tenants across Greater Manchester.",
};

export default function TenantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
