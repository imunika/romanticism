import Heading from "../components/Heading";

export default function AboutPage() {
  return (
    <>
      <Heading>About</Heading>
      <div className="grid grid-cols-12 bg-[rgba(145,101,34,0.07)] mb-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-3"></div>
        <div className="mb-6 col-span-10 md:col-span-8 lg:col-span-6">
          <div className="text-md text-justify text-slate-700 font-light leading-7 p-4 pt-11">
            <figure className="object-center sm:float-right ml-7 mt-2">
              <img
                src="/images/RomitaRay_bio.jpg"
                alt="Romita Ray"
                className="w-50 h-80 border border-slate-300 p-1"
              />
              <figcaption className="mt-1 ml-1 text-xs text-slate-500 dark:text-gray-400">
                Romita Ray
              </figcaption>
            </figure>
            <p className="mt-4 sm:mt-0">
              The course HOA 458: Art of Romanticism is taught by professor{" "}
              <a
                href="https://artsandsciences.syracuse.edu/people/faculty/ray--kapoor-romita/"
                target="_blank"
              >
                <span className="text-[rgb(168,79,0)]">Romita Ray</span>
              </a>
              . Dr. Ray specializes in the art and architecture of the British
              Empire in India. At Syracuse University, she teaches European art
              and architecture (18th, 19th, and early 20th centuries), Indian
              art and architecture, post-colonial theory, theories of
              Orientalism, and film studies. She is an editorial board member
              for the Journal of South Asian Studies and a member of the
              Advisory Committee for the Indian Council of Historical Research
              based in New Delhi, India. Dr. Ray has taught at Colby College,
              the University of Georgia, and Yonsei University (Seoul, Korea).
              Her research interests center on the art/architecture of the
              British empire in India, history of science, landscape studies,
              post-colonial theory, Orientalism in art, and material culture.
            </p>
            <br />
            <p>
              <i>Romanticism at SU</i> is a collaboration between prof Romita
              Ray (College of Arts and Sciences) and her students with professor{" "}
              <a href="#" target="_blank">
                <span className="text-[rgb(168,79,0)]">Daniel Acuna </span>
              </a>
              (School of Information Studies) at Syracuse University and{" "}
              <a href="#" target="_blank">
                <span className="text-[rgb(168,79,0)]">Elizabeth Novoa</span>
              </a>{" "}
              (Unika Analytics). The idea to collaborate on a website was born
              while riding the Connective Corridor bus at Syracuse University
              and evolved over the course of two semesters.
            </p>
            <br />
            <p>
              Professor Ray and her students thank Laura Wellner, Emily Dittman,
              and Emma Geiler in the Syracuse University Art Galleries, and
              Nicole Westerdahl and Colleen Theisen in the Special Collections
              Research Center at Syracuse University. They also thank Jennifer
              Riley (The Museum of Fine Arts, Boston), Heidi S. Raatz
              (Minneapolis Institute of Art), and Mary Seo (The Walters Art
              Museum, Baltimore) for their help with images related to the
              essays written by the students.
            </p>
            <br />
            {/* layout="intrinsic" width={500} height={800} */}
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3"></div>
      </div>
    </>
  );
}
