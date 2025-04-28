"use client";
import artworks from "/app/artworks.json";
import ImageGallery from "/app/components/ImageGallery";
import { useState, useEffect, use } from "react";

export default function ShowArtifact({ params }) {
  const slug = use(params).slug; // Unwrap the params Promise
  const artwork = artworks.find((item) => item.slug === slug);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return (
    <div className="relative">
      {/* Hero Image Section */}
      <div
        className="h-auto md:h-screen w-full relative"
        style={{
          backgroundImage: `url(${artwork.main_img})`,
          backgroundSize: isMobile ? "100% auto" : "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply",
        }}
      >
        {/* Color Overlay */}
        <div className="absolute inset-0 bg-[rgba(190,90,15,0.9)] mix-blend-multiply"></div>

        {/* Title */}
        <div className="relative px-10 lg:w-3/4 py-4 md:py-12 md:absolute md:bottom-40 lg:bottom-28 lg:left-24">
          <h1
            className="text-white text-3xl md:text-5xl lg:text-6xl font-light whitespace-pre-line"
            style={{ lineHeight: "1.2em" }}
          >
            {artwork.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="my-12 border-2 border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gallery section */}
        <div className="w-full h-full bg-[rgb(248,244,240)]">
          <div className="flex flex-col items-center justify-start px-8 md:px-12">
            <div className="w-full">
              {/* Main Image */}
              <div className="w-full text-center">
                <ImageGallery images={artwork.main_img_gallery} label="main" />
              </div>

              {/* Related Images */}
              {artwork.related_img && artwork.related_img.length > 0 && (
                <div className="w-full">
                  <p className="uppercase text-xs text-stone-500">
                    Related Images
                  </p>
                  <hr className="h-px my-1 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                  <ImageGallery images={artwork.related_img} label="related" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details section */}
        <div className="max-w-4xl mx-auto px-4 md:px-10 py-4">
          <div className="mb-8 md:mb-12">
            <div className="text-slate-700 font-light leading-6 md:leading-7">
              <h2
                className="text-3xl lg:text-4xl font-light mb-6"
                dangerouslySetInnerHTML={{
                  __html: artwork.title,
                }}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody>
                  {Object.entries(artwork.Details).map(([key, value]) => (
                    <tr key={key} className="">
                      <td className="w-1/3 px-2 md:px-4 py-2 md:py-3 text-sm uppercase font-semibold text-neutral-500 align-top">
                        {key}
                      </td>
                      <td
                        className="px-2 md:px-4 py-2 md:py-3 text-sm lg:text-base font-light text-stone-500 align-top"
                        dangerouslySetInnerHTML={{ __html: value }}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-slate-700 font-light leading-6 md:leading-7 mt-4 md:mt-6">
              <p className="text-base md:text-lg font-semibold">Description</p>
              <hr className="h-px my-2 bg-gray-300 border-0 dark:bg-gray-700"></hr>
              <div
                className="text-sm md:text-base"
                dangerouslySetInnerHTML={{
                  __html: artwork.Description,
                }}
              />
            </div>

            <div className="text-slate-700 font-light leading-6 md:leading-7 mt-4 md:mt-6">
              <p className="text-base md:text-lg font-semibold">Essay</p>
              <hr className="h-px my-2 bg-gray-300 border-0 dark:bg-gray-700"></hr>
              <div
                className="text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: artwork.Essay }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
