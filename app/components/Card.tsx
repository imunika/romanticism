import Link from "next/link";

interface CardProps {
  title: string;
  artist: string;
  image: string;
  slug: string;
}

export default function Card({ title, artist, image, slug }: CardProps) {
  return (
    <div
      className="bg-white border shadow hover:shadow-xl rounded-xl relative text-white"
      key={slug}
    >
      <Link href={`/artifacts/${slug}`}>
        <img
          src={image}
          alt=""
          className="aspect-[1.6/2] h-full w-full object-cover rounded-xl"
        />
        <div className="absolute inset-0 h-full w-full z-10 bg-gradient-to-b from-transparent to-stone-800 opacity-40 rounded-b-xl"></div>
        <div className="mt-4 absolute bottom-0 left-0 z-20">
          <h2 className="p-2 text-center text-white font-taviraj text-xl">
            {title}
          </h2>
          <p className="text-white text-sm mx-2 mb-2">{artist}</p>
        </div>
      </Link>
    </div>
  );
}
