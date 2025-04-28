"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface AuthorAccordionProps {
  authorName: string;
  authorHeadshot: string;
  authorBio: string;
}

export default function AuthorAccordion({
  authorName,
  authorHeadshot,
  authorBio,
}: AuthorAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="my-2">
      <button
        className="w-full flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-sm flex items-center">
          by&nbsp;
          <span className="text-base text-[rgb(168,79,0)]"> {authorName}</span>
        </span>
        <ChevronDown
          size={16}
          className={`transition-all duration-700 text-[rgb(168,79,0)] group-hover:translate-y-0.5 group-hover:scale-110 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-1000 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-4 pb-6 flex gap-4 transform transition-transform duration-1000 ease-out">
          <div className="flex-shrink-0">
            <Image
              src={authorHeadshot}
              alt={authorName}
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <div
            className="text-sm leading-7 tracking-wide font-light text-gray-600"
            dangerouslySetInnerHTML={{ __html: authorBio }}
          />
        </div>
      </div>
    </div>
  );
}
