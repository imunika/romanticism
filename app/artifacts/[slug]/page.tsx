import artworks from "../../artworks.json";
import { Metadata } from "next";
import ArtifactClient from "../ArtifactClient";
import { Artwork } from "../types";

interface ShowArtifactProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: ShowArtifactProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = artworks.find((item) => item.slug === slug);

  return {
    title: artwork?.title || "Artwork",
  };
}

export default async function ShowArtifact({ params }: ShowArtifactProps) {
  const { slug } = await params;
  const artwork = artworks.find((item) => item.slug === slug);

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return <ArtifactClient artwork={artwork as Artwork} />;
}

export interface ImageDetails {
  src: string;
  description: string;
  label?: string;
}

export interface ArtworkDetails {
  Artist: string;
  Date: string;
  "Medium or Technique": string;
  Dimensions?: string;
  Collection: string;
  "Accession Number": string;
  "Credit Line": string;
  Book?: string;
  Series?: string;
}
