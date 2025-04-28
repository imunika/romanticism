"use client";
import Heading from "../components/Heading";
import Accordion from "../components/Accordion";
import records from "../records.json";

export default function EssaysPage() {
  return (
    <>
      <Heading>All Essays</Heading>
      <div className="grid grid-cols-12 bg-[rgba(145,101,34,0.07)] mb-6 pb-14">
        <div className="col-span-1 md:col-span-2 lg:col-span-3"></div>
        <div className="col-span-10 md:col-span-8 lg:col-span-6">
          <div className="flex justify-center mt-4 p-1">
            <div className="list w-full">
              {/* begin item */}
              {records.map((item, key) => (
                <Accordion key={key} data={item} />
              ))}
              {/* end item  */}
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3"></div>
      </div>
    </>
  );
}
