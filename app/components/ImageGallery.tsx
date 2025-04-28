"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Maximize,
  Share,
  Search,
} from "lucide-react";
import DOMPurify from "dompurify";

interface Image {
  src: string;
  description: string;
}

interface GalleryProps {
  images: Image[];
  label?: "main" | "related";
}

interface Position {
  x: number;
  y: number;
}

interface ImageDimensions {
  width: number;
  height: number;
}

export default function Gallery({ images, label = "related" }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({
    width: 800,
    height: 600,
  });
  const hasDraggedRef = useRef(false);
  const clickStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const loadImageDimensions = useCallback((src: string) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      console.log(img.naturalWidth, img.naturalHeight);
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
  }, []);

  const openLightbox = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      loadImageDimensions(images[index].src);
    },
    [loadImageDimensions, images]
  );
  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    // Reset zoom and pan states
    setZoomLevel(1);
    setIsZoomed(false);
    setPosition({ x: 0, y: 0 });
  }, []);
  const nextImage = useCallback(() => {
    setIsZoomed(false);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );
  }, [images]);
  const prevImage = useCallback(() => {
    setIsZoomed(false);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images]);

  const toggleZoom = () => setIsZoomed(!isZoomed);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const shareImage = () => {
    if (navigator.share && selectedIndex !== null) {
      navigator.share({
        title: `Image ${selectedIndex + 1}`,
        url: images[selectedIndex].src,
      });
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (!isZoomed) {
      const newZoomLevel = 2.5;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const newX = (e.clientX - centerX) * (1 - newZoomLevel);
      const newY = (e.clientY - centerY) * (1 - newZoomLevel);
      setZoomLevel(newZoomLevel);
      setIsZoomed(true);
      setPosition({ x: newX, y: newY });
    } else {
      setZoomLevel(1);
      setIsZoomed(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    clickStartRef.current = { x: e.clientX, y: e.clientY };
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return;
    const dx = e.clientX - clickStartRef.current.x;
    const dy = e.clientY - clickStartRef.current.y;
    if (!hasDraggedRef.current && Math.sqrt(dx * dx + dy * dy) > 5) {
      hasDraggedRef.current = true;
    }
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (selectedIndex !== null) {
        if (event.key === "ArrowLeft") prevImage();
        if (event.key === "ArrowRight") nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, prevImage, nextImage, closeLightbox]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  // Early return if no images provided
  if (!images || images.length === 0) {
    return null; // Return nothing instead of "No images available" message
  }

  return (
    <div className="my-4">
      {label === "main" ? (
        // Single large image for main view
        <div className="w-full">
          <button
            onClick={() => openLightbox(0)}
            className="relative block w-full h-full mx-auto mt-8 mb-12 aspect-[2/3] lg:aspect-[4/3] group"
          >
            <Image
              src={images[0].src}
              alt={`Main Image`}
              fill
              sizes="100vw"
              className="transition object-contain group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <Search
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                size={40}
              />
            </div>
          </button>
        </div>
      ) : (
        // Grid view for related images
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={image.src}
              onClick={() => openLightbox(index)}
              className="aspect-[4/3] relative block w-full h-[200px] sm:h-[150px] md:h-[110px] group"
            >
              <Image
                src={image.src}
                alt={`Gallery Image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 33vw, 25vw"
                className="shadow-md transition object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <Search
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  size={24}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selectedIndex !== null && (
        <Dialog
          open={true}
          onClose={closeLightbox}
          className="fixed inset-0 bg-black flex items-center justify-center"
        >
          {/* Top controls */}
          <div className="absolute top-4 right-6 flex space-x-6 z-10">
            <button onClick={toggleZoom} className="text-white">
              {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
            </button>
            <button onClick={toggleFullscreen} className="text-white">
              <Maximize size={20} />
            </button>
            <button onClick={shareImage} className="text-white">
              <Share size={20} />
            </button>
            <button onClick={closeLightbox} className="text-white">
              <X size={20} />
            </button>
          </div>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute top-2 left-2 text-white text-sm z-10">
              {selectedIndex + 1}/{images.length}
            </div>
          )}

          {/* Main content container with flex column */}
          <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-4 pt-10 md:pt-2 pb-20">
            {/* Image container */}
            <div
              ref={containerRef}
              className="relative max-w-full max-h-full flex items-center justify-center p-2"
              onMouseMove={handleMouseMove}
              style={{
                cursor: isZoomed
                  ? isDragging
                    ? "grabbing"
                    : "grab"
                  : "zoom-in",
              }}
            >
              {isZoomed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  ref={imageRef}
                  src={images[selectedIndex].src}
                  alt="Selected Image"
                  onClick={handleImageClick}
                  onMouseDown={handleMouseDown}
                  className="object-contain max-h-[75vh] w-auto transition-transform duration-200"
                  style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${zoomLevel})`,
                    transformOrigin: "center",
                    transition: isDragging
                      ? "none"
                      : "transform 200ms ease-out",
                  }}
                  draggable={false}
                />
              ) : (
                <Image
                  ref={imageRef}
                  src={images[selectedIndex].src}
                  alt="Selected Image"
                  width={imageDimensions.width}
                  height={imageDimensions.height}
                  onClick={handleImageClick}
                  onMouseDown={handleMouseDown}
                  className="object-contain max-h-[75vh] w-auto transition-transform duration-200"
                  style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${zoomLevel})`,
                    transformOrigin: "center",
                  }}
                  draggable={false}
                />
              )}
            </div>

            {/* Description container */}
            {!isZoomed && images[selectedIndex].description && (
              <div className="w-full flex justify-center">
                <div className="w-[75vh] max-w-3xl">
                  <div
                    className="text-white/60 text-sm bg-black bg-opacity-50 px-6 py-3 rounded"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        images[selectedIndex].description
                      ),
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white z-10"
              >
                <ChevronLeft size={40} strokeWidth={1} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white z-10"
              >
                <ChevronRight size={40} strokeWidth={1} />
              </button>
            </>
          )}
        </Dialog>
      )}
    </div>
  );
}
