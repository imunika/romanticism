import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essays",
  description: "Collection of essays exploring Romantic art and literature",
};

export default function EssaysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
