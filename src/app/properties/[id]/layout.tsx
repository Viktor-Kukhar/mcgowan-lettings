import type { Metadata } from "next";
import { getProperty } from "./get-property";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    return {
      title: "Property Not Found | McGowan Residential Lettings",
    };
  }

  const title = `${property.title} | McGowan Residential Lettings`;
  const description = `${property.title} in ${property.location} — £${property.price?.toLocaleString()} pcm. ${property.beds} bedroom ${property.type?.toLowerCase() || "property"} available to rent. View details and enquire with McGowan Residential Lettings.`;
  const image = property.images?.[0] || "/hero.jpg";

  return {
    title,
    description,
    alternates: { canonical: `/properties/${id}` },
    openGraph: {
      title,
      description,
      url: `https://mcgowanlettings.co.uk/properties/${id}`,
      images: [{ url: image, width: 1200, height: 630, alt: property.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function PropertyDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
