"use client";
import artworks from "/app/artworks.json";
import Card from "./components/Card";
import Fuse from "fuse.js";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Component that handles search functionality
function SearchHandler({ onSearch }) {
  const searchParams = useSearchParams();

  // Get search query from URL parameters
  useEffect(() => {
    const urlQuery = searchParams?.get("q") || "";
    onSearch(urlQuery);
  }, [searchParams, onSearch]);

  return null;
}

export default function HomePage({ params }) {
  const [query, setQuery] = useState("");

  const handleSearch = (urlQuery) => {
    setQuery(urlQuery || "");
  };

  const fuse = new Fuse(artworks, {
    includeScore: true,
    keys: ["title", "Details.Artist", "Description", "Essay", "author_essay"],
  });

  // Add safeguards against undefined results
  const results = query ? fuse.search(query) : [];
  const artworksResults =
    query && results?.length > 0
      ? results.map((result) => result.item)
      : artworks;

  // Add error handling for params and slug
  if (!params || !params.slug) {
    // If no slug is provided, show all artworks or filtered by search
    return (
      <>
        <Suspense fallback={null}>
          <SearchHandler onSearch={handleSearch} />
        </Suspense>

        <p className="m-4 p-8 font-italiana font-extralight text-center text-5xl md:text-6xl lg:text-7xl mb-4 tracking-wide">
          <i>Romanticism at Syracuse University</i>
        </p>
        <div className="grid grid-cols-8 bg-[rgba(145,101,34,0.07)] mb-6 p-8">
          <div className="col-span-1 xl:col-span-2"></div>
          <div className="mb-6 col-span-6 xl:col-span-4">
            <p className="text-sm xl:text-base xl:leading-8 text-justify text-slate-700 font-light leading-7">
              <i>Romanticism at SU</i> emerged from a Spring 2019 course on the
              Art of Romanticism (HOA 458) taught at
              <a href="https://www.syracuse.edu/" target="_blank">
                <span className="text-[rgb(168,79,0)]">
                  {" "}
                  Syracuse University
                </span>
              </a>{" "}
              by professor Romita Ray in the{" "}
              <a
                href="http://amh.syr.edu/academics/amh-ug-program.html"
                target="_blank"
              >
                <span className="text-[rgb(168,79,0)]">
                  department of Art and Music Histories
                </span>
              </a>
              . The fourteen students enrolled in the course wrote about
              fourteen objects in the{" "}
              <a href="http://suart.syr.edu/" target="_blank">
                <span className="text-[rgb(168,79,0)]">
                  Syracuse University Art Galleries
                </span>
              </a>{" "}
              and the{" "}
              <a href="https://library.syr.edu/scrc/" target="_blank">
                <span className="text-[rgb(168,79,0)]">
                  Special Collections Research Center
                </span>
              </a>
              .<i> Romanticism at SU</i> is a collection of those stories. While
              students contextualized the objects within the broader themes of
              Romanticism, they also thought about how the stories they had
              chosen to write about might still be relevant today. Some stories
              are deeply personal, others are more critical and anchored by the
              history of art. But all of them stem from a deep desire to respond
              to works of art that the students had encountered for the first
              time.
            </p>
          </div>
          <div className="xl:col-span-2"></div>
        </div>
        <div className="grid grid-cols-8 pb-6 max-w-[1700px] mx-auto">
          <div></div>
          <div className="col-span-6 bg-[#fafafa] border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 p-8">
            {artworksResults &&
              artworksResults.map((artwork) => (
                <Card
                  key={artwork?.slug || ""}
                  title={artwork?.title || ""}
                  artist={artwork?.Details?.Artist || ""}
                  image={artwork?.card_img || ""}
                  slug={artwork?.slug || ""}
                />
              ))}
          </div>
          <div></div>
        </div>
      </>
    );
  }

  const slug = params.slug;
  const artwork = artworks.find((item) => item.slug === slug);

  // Handle case when artwork is not found
  if (!artwork) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl mb-4">Artwork not found</h1>
        <p>The artwork you're looking for could not be found.</p>
      </div>
    );
  }

  // If we have a valid artwork, render it
  return (
    <>
      <p className="m-4 p-8 font-italiana font-extralight text-center text-5xl md:text-6xl lg:text-7xl mb-4 tracking-wide">
        <i>Romanticism at Syracuse University</i>
      </p>

      <div className="grid grid-cols-8 bg-[rgba(145,101,34,0.07)] mb-6 p-8">
        <div className="col-span-1 lg:col-span-2"></div>
        <div className="mb-6 md:col-span-6 col-span-8 lg:col-span-4">
          <p className="text-sm xl:text-base xl:leading-8 text-justify text-slate-700 font-light leading-7">
            <i>Romanticism at SU</i> emerged from a Spring 2019 course on the
            Art of Romanticism (HOA 458) taught at
            <a href="https://www.syracuse.edu/" target="_blank">
              <span className="text-[rgb(168,79,0)]"> Syracuse University</span>
            </a>{" "}
            by professor Romita Ray in the{" "}
            <a
              href="http://amh.syr.edu/academics/amh-ug-program.html"
              target="_blank"
            >
              <span className="text-[rgb(168,79,0)]">
                department of Art and Music Histories
              </span>
            </a>
            . The fourteen students enrolled in the course wrote about fourteen
            objects in the{" "}
            <a href="http://suart.syr.edu/" target="_blank">
              <span className="text-[rgb(168,79,0)]">
                Syracuse University Art Galleries
              </span>
            </a>{" "}
            and the{" "}
            <a href="https://library.syr.edu/scrc/" target="_blank">
              <span className="text-[rgb(168,79,0)]">
                Special Collections Research Center
              </span>
            </a>
            .<i> Romanticism at SU</i> is a collection of those stories. While
            students contextualized the objects within the broader themes of
            Romanticism, they also thought about how the stories they had chosen
            to write about might still be relevant today. Some stories are
            deeply personal, others are more critical and anchored by the
            history of art. But all of them stem from a deep desire to respond
            to works of art that the students had encountered for the first
            time.
          </p>
        </div>
        <div className="lg:col-span-2"></div>
      </div>

      <div className="grid grid-cols-8 pb-6">
        <div></div>
        <div className="col-span-6 bg-[#fafafa] border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 p-8">
          <Card
            title={artwork?.title || ""}
            artist={artwork?.Details?.Artist || ""}
            image={artwork?.card_img || ""}
            slug={artwork?.slug || ""}
          />
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
}
