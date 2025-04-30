import NavBar from "./components/NavBar";
import {
  taviraj,
  raleway,
  lato,
  italiana,
  roboto,
  antic_didone,
} from "./fonts";
import "./globals.css";

export const metadata = {
  title: {
    default: "Romanticism at SU",
    template: "%s | Romanticism at SU",
  },
  description: "A comprehensive exploration of Romantic art and literature",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${taviraj.variable} ${italiana.variable} ${antic_didone.variable}`}
    >
      <body className="flex flex-col min-h-screen">
        <header>
          <NavBar />
        </header>
        <main className="grow pb-3">{children}</main>

        <footer className="border-t py-3 text-center text-xs">
          Designed & developed by{" "}
          <a
            href="#"
            target="_blank"
            className="text-orange-800 hover:underline"
          >
            Unika Analytics
          </a>
        </footer>
      </body>
    </html>
  );
}
