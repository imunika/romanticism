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
