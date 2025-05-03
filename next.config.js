/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure Next.js doesn't prematurely reference variables
  // This may help with the 'N' lexical declaration error
  experimental: {
    optimizeCss: false, // Disable this since it requires critters
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "@headlessui/react",
    ],
  },
  poweredByHeader: false,
  // Adjust compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
