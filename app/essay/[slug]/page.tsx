import SocialIcons from "./../../components/Socialicons";
import Link from "next/link";
import records from "./../../records.json";
import { Metadata } from "next";
// Import all essay components
import AmericanCrowEssay from "./../../essays/the-glorious-american-crow/page";
import ArchConstantineEssay from "../../essays/romance-under-the-arch-of-constantine/page";
import ChocoruasCurseEssay from "./../../essays/rugged-landscapes-revealing-the-political-in-thomas-coles-chocoruas-curse/page";
import IllustratingIllnessEssay from "./../../essays/illustrating-illness/page";
import TurretGableEssay from "../../essays/romanticizing-a-specimen-of-gothic-architecture/page";
import UntitledSeascapeEssay from "./../../essays/j-m-w-turners-fascination-with-the-sea/page";
import WildHorseEssay from "./../../essays/the-feeling-horse/page";
import DelawareWaterGapEssay from "./../../essays/aesthetic-landscape-asher-brown-durand-and-the-delaware-water-gap/page";
import EarlyPloughmanEssay from "./../../essays/a-sparkle-within-a-landscape/page";
import EtudeEssay from "./../../essays/eugene-delacroixs-etude-de-femme-in-the-history-of-the-female-nude/page";
import MorningStarsEssay from "./../../essays/stars-sang-together-book-of-job/page";
import PenelopesDreamEssay from "./../../essays/dreams-and-nightmares-examining-john-flaxmans-penelopes-dream/page";
import SongsOfInnocenceEssay from "./../../essays/fleeting-innocence-in-william-blakes-songs-of-innocence/page";
import TigerEssay from "./../../essays/antoine-louis-barye-the-king-of-the-animalier/page";
import AuthorAccordion from "../../components/AuthorAccordion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Create a component mapping
const COMPONENT_MAP = {
  AmericanCrowEssay,
  ArchConstantineEssay,
  ChocoruasCurseEssay,
  IllustratingIllnessEssay,
  TurretGableEssay,
  UntitledSeascapeEssay,
  WildHorseEssay,
  DelawareWaterGapEssay,
  EarlyPloughmanEssay,
  EtudeEssay,
  MorningStarsEssay,
  PenelopesDreamEssay,
  SongsOfInnocenceEssay,
  TigerEssay,
};

interface EssayProps {
  id: number;
  author_essay: string;
  author_headshot: string;
  title_essay: string;
  artwork_img: string;
  artwork: string;
  author: string;
  desc: string;
  essay: string;
  prev: string;
  next: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = params;
  const essay = records.find((record) => record.essay === `/essay/${slug}`);

  return {
    title: essay?.title_essay || "Essay",
  };
}

export default async function RomanticismEssay({ params, searchParams }) {
  const { slug } = await params;
  // const search = await searchParams;
  const essay = records.find((record) => record.essay === `/essay/${slug}`);

  if (!essay) {
    return <div>Essay not found</div>;
  }

  // Get the component from the mapping
  const EssayComponent =
    COMPONENT_MAP[essay.component as keyof typeof COMPONENT_MAP];

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${essay.artwork_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
        }}
      >
        <div className="grid grid-cols-8 mx-6 pb-32">
          <div></div>
          <div className="bg-white shadow-xl mt-32 mb-10 md:col-span-6 col-span-8 relative z-10">
            <div className="flex justify-end">
              <SocialIcons />
            </div>
            <div className="px-10 pb-10 sm:mx-24 xl:mx-32 2xl:mx-40">
              <h1 className="font-italiana font-light pb-3 text-5xl">
                {essay.title_essay}
              </h1>
              <AuthorAccordion
                authorName={essay.author_essay}
                authorHeadshot={essay.author_headshot}
                authorBio={essay.author_bio}
              />
              <div className="border-t border-[#d3d3d3] mt-4 pt-8" />

              {/* essay component */}
              {EssayComponent && <EssayComponent />}
            </div>
          </div>
        </div>

        <div className="absolute pt-36 bg-[rgba(248,244,240,255)] grid grid-cols-8 bottom-0 left-0 right-0 z-0">
          <div className="my-10 mx-6 col-span-8">
            <div className="flex justify-between gap-4 mx-10 lg:mx-40 xl:mx-60">
              {/* Navigation container with fixed widths */}
              <div className="text-left text-orange-800 w-[45%]">
                <div className="font-medium text-sm md:text-2xl flex items-center gap-1">
                  <ChevronLeft className="inline-block shrink-0" size={40} />
                  <span className="inline-block">PREV</span>
                </div>
                <Link
                  href={essay.prev}
                  className="font-light text-sm md:text-lg hover:underline line-clamp-2"
                >
                  {records.find((record) => record.essay === essay.prev)
                    ?.title_essay || "Previous Essay"}
                </Link>
              </div>
              <div className="text-right text-orange-800 w-[45%]">
                <div className="font-medium text-sm md:text-2xl flex items-center justify-end gap-1">
                  <span className="inline-block">NEXT</span>
                  <ChevronRight className="inline-block shrink-0" size={40} />
                </div>
                <Link
                  href={essay.next}
                  className="font-light text-sm md:text-lg hover:underline line-clamp-2"
                >
                  {records.find((record) => record.essay === essay.next)
                    ?.title_essay || "Next Essay"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// import SocialIcons from "./../../components/Socialicons";
// import Link from "next/link";
// import records from "./../../records.json";
// import AmericanCrowEssay from "./../../essays/the-glorious-american-crow/page";

// interface EssayProps {
//   id: number;
//   author_essay: string;
//   author_headshot: string;
//   title_essay: string;
//   artwork_img: string;
//   artwork: string;
//   author: string;
//   desc: string;
//   essay: string;
//   prev: string;
//   next: string;
// }

// export default function RomanticismEssay({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const { slug } = params;
//   const essay = records.find((record) => record.essay === `/essays/${slug}`);

//   if (!essay) {
//     return <div>Essay not found</div>;
//   }

//   return (
//     <>
//       <div
//         style={{
//           backgroundImage: `url(${essay.artwork_img})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed",
//           position: "relative",
//         }}
//       >
//         <div className="grid grid-cols-8 mx-6 pb-32">
//           <div></div>
//           <div className="bg-white shadow-xl mt-32 mb-10 md:col-span-6 col-span-8 relative z-10">
//             <div className="flex justify-end">
//               <SocialIcons />
//             </div>
//             <div className="px-10 pb-10 sm:mx-24 xl:mx-32 2xl:mx-40">
//               <h1 className="font-italiana font-light pb-3 text-5xl">
//                 {essay.title_essay}
//               </h1>
//               <p>&gt; by {essay.author_essay}</p>
//               {/* <img
//                 src="/images/headshots/emily-sullivan.png"
//                 alt=""
//                 className="w-16 h-16 float-left"
//               /> */}
//               {/* essay component */}
//               <AmericanCrowEssay />
//             </div>
//           </div>
//         </div>

//         <div className="absolute pt-36 bg-[rgba(248,244,240,255)] grid grid-cols-8 bottom-0 left-0 right-0 z-0">
//           <div className="my-10 mx-6 col-span-8">
//             <div className="flex justify-between gap-4 mx-10 lg:mx-40 xl:mx-60">
//               <div className="text-left font-italiana text-orange-800">
//                 <div className="font-bold text-sm md:text-xl ">&lt; PREV</div>
//                 <Link
//                   href={essay.prev}
//                   className="text-sm md:text-xl hover:underline"
//                 >
//                   {essay.prev}
//                 </Link>
//               </div>
//               <div className="text-right font-italiana text-orange-800">
//                 <div className="font-bold text-sm md:text-xl">NEXT &gt;</div>
//                 <Link
//                   href={essay.next}
//                   className="text-sm md:text-xl hover:underline"
//                 >
//                   {essay.next}
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
