"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();

  const linkStyle = (path) =>
    pathname === path
      ? "font-bold text-black"
      : "text-gray-600 hover:text-black";

  return (
    <nav className="border-b">
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
        <div className="flex items-center mt-2 mr-4 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Type keyword to search..."
              className="border shadow-sm border-stone-200 rounded px-2 py-1 text-sm pr-10 
              focus:outline-none focus:ring-1 focus:ring-amber-700"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Search size={15} className="text-gray-600 hover:text-black" />
            </button>
          </div>
        </div>
      </ul>
    </nav>
  );
}
