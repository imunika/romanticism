"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef, Suspense } from "react";
import Fuse from "fuse.js";
import artworks from "/app/artworks.json";

// SearchContent component that uses useSearchParams
function SearchContent({ children }) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const searchRef = useRef(null);

  // Initialize fuse search
  const fuse = new Fuse(
    artworks.map((artwork) => ({
      ...artwork,
      // Clean HTML tags from Essay field for better searching
      Essay: artwork.Essay ? cleanHtml(artwork.Essay) : artwork.Essay,
    })),
    {
      includeScore: true,
      threshold: 0.3,
      keys: ["title", "Details.Artist", "Description", "Essay", "author_essay"],
    }
  );

  // Function to clean HTML tags from text
  const cleanHtml = (html) => {
    if (!html) return "";
    return html
      .replace(/<a[^>]*>(.*?)<\/a>/g, "$1") // Replace <a> tags with their content
      .replace(/<[^>]*>/g, "") // Remove all other HTML tags
      .replace(/&nbsp;/g, " ") // Replace &nbsp; with spaces
      .replace(/\s+/g, " ") // Normalize whitespace
      .trim();
  };

  // Initialize search query from URL parameters and perform search
  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);

    if (query) {
      performSearch(query);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchParams]);

  // Function to highlight search terms in text
  const highlightMatch = (text, query) => {
    if (!query || !text) return text;

    try {
      // Escape special regex characters
      const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${safeQuery})`, "gi");

      // Split by regex matches
      const parts = text.split(regex);

      if (parts.length <= 1) return text;

      // Build the result with spans for the matched parts
      return parts
        .map((part, i) => {
          if (part.toLowerCase() === query.toLowerCase()) {
            return `<span class="bg-amber-100 text-amber-900">${part}</span>`;
          }
          return part;
        })
        .join("");
    } catch (e) {
      console.error("Highlight error:", e);
      return text;
    }
  };

  const performSearch = (query) => {
    try {
      if (!query.trim()) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      console.log("Searching for:", query);

      // Perform search with fuse.js
      const results = fuse.search(query);
      console.log("Search results:", results.length, results);

      // Map results to their items
      const items = results.map((result) => result.item);
      setSearchResults(items);
      setShowResults(items.length > 0);

      // If no results found, try to search with less strict options
      if (items.length === 0) {
        const looseSearch = new Fuse(
          artworks.map((artwork) => ({
            ...artwork,
            // Clean HTML tags from Essay field for better searching
            Essay: artwork.Essay ? cleanHtml(artwork.Essay) : artwork.Essay,
          })),
          {
            includeScore: true,
            threshold: 0.6, // Much more lenient matching
            keys: [
              "title",
              "Details.Artist",
              "Description",
              "Essay",
              "author_essay",
            ],
          }
        );

        const looseResults = looseSearch.search(query);
        console.log("Loose search results:", looseResults.length);

        if (looseResults.length > 0) {
          setSearchResults(looseResults.map((result) => result.item));
          setShowResults(true);
        }
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
  };

  // Handle clicks outside the search results to close the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
    } else {
      // Perform search as the user types
      performSearch(value);
    }
  };

  // Function to toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to get clean content for display
  const getCleanContent = (artwork, field) => {
    // For Essay field, return the cleaned version for searching and displaying
    if (field === "Essay" && artwork[field]) {
      return cleanHtml(artwork[field]);
    }
    return artwork[field] || "";
  };

  return (
    <div className="flex items-center mt-2 mr-4 md:mt-0" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Type keyword to search..."
          className="border shadow-sm border-stone-200 rounded px-2 py-1 text-sm pr-10 
          focus:outline-none focus:ring-1 focus:ring-amber-700"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => searchQuery.trim() && setShowResults(true)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Search size={15} className="text-gray-600 hover:text-black" />
        </button>

        {/* Floating search results */}
        {showResults && searchResults.length > 0 && (
          <div
            className={`absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md z-50 overflow-hidden
              ${isExpanded ? "w-[95vw] max-w-4xl" : "w-80 md:w-96"}`}
            style={{
              maxHeight: isExpanded ? "80vh" : "60vh",
              overflowY: "auto",
            }}
          >
            <div className="flex justify-between items-center p-3 border-b sticky top-0 bg-white">
              <h3 className="font-medium text-sm">
                {searchResults.length} results for "{searchQuery}"
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleExpanded}
                  className="text-gray-500 hover:text-amber-700 p-1"
                  title={isExpanded ? "Collapse results" : "Expand results"}
                >
                  {isExpanded ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                <button
                  onClick={() => setShowResults(false)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                  title="Close results"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <ul className="py-2">
              {searchResults.map((artwork) => (
                <li key={artwork.slug} className="hover:bg-gray-50">
                  <Link
                    href={`/artifacts/${artwork.slug}`}
                    className="block px-4 py-2 text-sm"
                    onClick={() => setShowResults(false)}
                  >
                    <div
                      className={`flex items-start gap-3 ${
                        isExpanded ? "flex-row" : ""
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 rounded overflow-hidden ${
                          isExpanded ? "w-16 h-16" : "w-12 h-12"
                        }`}
                      >
                        <img
                          src={artwork.card_img}
                          alt={artwork.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={isExpanded ? "flex-1" : ""}>
                        <p
                          className="font-medium text-gray-900"
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(artwork.title, searchQuery),
                          }}
                        ></p>
                        <p
                          className="text-xs text-gray-600"
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(
                              artwork.Details.Artist,
                              searchQuery
                            ),
                          }}
                        ></p>
                        {/* Show a snippet of description if it contains the search term */}
                        {artwork.Description &&
                          artwork.Description.toLowerCase().includes(
                            searchQuery.toLowerCase()
                          ) && (
                            <p
                              className={`text-xs text-gray-500 mt-1 ${
                                isExpanded ? "" : "truncate max-w-[220px]"
                              }`}
                              dangerouslySetInnerHTML={{
                                __html: isExpanded
                                  ? highlightMatch(
                                      artwork.Description,
                                      searchQuery
                                    )
                                  : "..." +
                                    highlightMatch(
                                      artwork.Description.substring(
                                        Math.max(
                                          0,
                                          artwork.Description.toLowerCase().indexOf(
                                            searchQuery.toLowerCase()
                                          ) - 20
                                        ),
                                        Math.min(
                                          artwork.Description.length,
                                          artwork.Description.toLowerCase().indexOf(
                                            searchQuery.toLowerCase()
                                          ) +
                                            searchQuery.length +
                                            40
                                        )
                                      ),
                                      searchQuery
                                    ) +
                                    "...",
                              }}
                            ></p>
                          )}
                        {/* Show a snippet of essay if it contains the search term */}
                        {artwork.Essay &&
                          getCleanContent(artwork, "Essay")
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) && (
                            <p
                              className={`text-xs text-gray-500 mt-1 ${
                                isExpanded ? "" : "truncate max-w-[220px]"
                              }`}
                              dangerouslySetInnerHTML={{
                                __html: isExpanded
                                  ? highlightMatch(
                                      getCleanContent(
                                        artwork,
                                        "Essay"
                                      ).substring(0, 300),
                                      searchQuery
                                    ) +
                                    (getCleanContent(artwork, "Essay").length >
                                    300
                                      ? "..."
                                      : "")
                                  : "..." +
                                    highlightMatch(
                                      getCleanContent(
                                        artwork,
                                        "Essay"
                                      ).substring(
                                        Math.max(
                                          0,
                                          getCleanContent(artwork, "Essay")
                                            .toLowerCase()
                                            .indexOf(
                                              searchQuery.toLowerCase()
                                            ) - 20
                                        ),
                                        Math.min(
                                          getCleanContent(artwork, "Essay")
                                            .length,
                                          getCleanContent(artwork, "Essay")
                                            .toLowerCase()
                                            .indexOf(
                                              searchQuery.toLowerCase()
                                            ) +
                                            searchQuery.length +
                                            40
                                        )
                                      ),
                                      searchQuery
                                    ) +
                                    "...",
                              }}
                            ></p>
                          )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="p-2 border-t text-center">
              <button
                onClick={toggleExpanded}
                className="text-xs text-amber-700 hover:text-amber-900 flex items-center justify-center mx-auto"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp size={14} className="mr-1" />
                    Collapse results
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} className="mr-1" />
                    View all results
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* No results message */}
        {showResults && searchQuery && searchResults.length === 0 && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-md rounded-md z-50">
            <div className="p-3 text-center">
              <p className="text-sm text-gray-600">
                No results found for "{searchQuery}"
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default function NavBar() {
  const pathname = usePathname();

  const linkStyle = (path) =>
    pathname === path
      ? "font-bold text-black"
      : "text-gray-600 hover:text-black";

  return (
    <nav className="border-b relative">
      <ul className="flex flex-wrap items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/">
            <img
              src="/images/logo_RatSU_2.png"
              width={160}
              height={80}
              alt="logo romanticism at SU"
            />
          </Link>
        </div>
        <div className="flex flex-grow items-center justify-center gap-4 md:gap-8">
          <li>
            <Link
              href="/"
              className={`hover:no-underline whitespace-nowrap ${linkStyle(
                "/"
              )}`}
            >
              <span className="text-sm lg:text-base">HOME</span>
            </Link>
          </li>
          <div className="h-4 w-px bg-gray-300"></div>
          <li>
            <Link
              href="/essays"
              className={`hover:no-underline whitespace-nowrap ${linkStyle(
                "/essays"
              )}`}
            >
              <span className="text-sm lg:text-base">ESSAYS</span>
            </Link>
          </li>
          <div className="h-4 w-px bg-gray-300"></div>
          <li>
            <Link
              href="/about"
              className={`hover:no-underline whitespace-nowrap ${linkStyle(
                "/about"
              )}`}
            >
              <span className="text-sm lg:text-base">ABOUT</span>
            </Link>
          </li>
        </div>
        <Suspense
          fallback={
            <div className="flex items-center mt-2 mr-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type keyword to search..."
                  className="border shadow-sm border-stone-200 rounded px-2 py-1 text-sm pr-10 
                focus:outline-none focus:ring-1 focus:ring-amber-700"
                  disabled
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Search size={15} className="text-gray-400" />
                </div>
              </div>
            </div>
          }
        >
          <SearchContent />
        </Suspense>
      </ul>
    </nav>
  );
}
