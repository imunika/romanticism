import artworks from "../../artworks.json";
import { Metadata } from "next";
import ArtifactClient from "../ArtifactClient";
import { Artwork } from "./types";

interface ShowArtifactProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ShowArtifactProps): Promise<Metadata> {
  const artwork = artworks.find((item) => item.slug === params.slug);

  return {
    title: artwork?.title || "Artwork",
  };
}

export default function ShowArtifact({ params }: ShowArtifactProps) {
  const artwork = artworks.find((item) => item.slug === params.slug);

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

export interface Artwork {
  slug: string;
  title: string;
  Details: ArtworkDetails;
  Description: string;
  Essay: string;
  main_img: string;
  main_img_gallery: ImageDetails[];
  related_img: ImageDetails[];
  card_img: string;
  author_essay: string;
  component: string;
}
