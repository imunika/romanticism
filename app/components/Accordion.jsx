import Link from "next/link";
import { useState } from "react";
import { PiCaretDoubleRightLight } from "react-icons/pi";

export default function Accordion(props) {
  const [item, setItem] = useState(props.data);
  const handletoggleActive = () => {
    let newActive = item.active === 1 ? 0 : 1;
    setItem({ ...item, active: newActive });
  };
  return (
    <div
      className={`my-2 group px-4 border-b border-[#c9c9c9] duration-1000 ${
        item.active === 1 ? "is-active" : ""
      }`}
    >
      <div
        className="flex items-start gap-4 cursor-pointer group"
        onClick={handletoggleActive}
      >
        <div className="text-lg font-light my-4 w-full duration-1000 hover:cursor-pointer">
          {item.title_essay}
        </div>
        <div className="text-xl mt-4 rotate-90 transition duration-1000 group-[.is-active]:rotate-[270deg] group-hover:text-[rgb(168,79,0)]">
          <PiCaretDoubleRightLight className="group-hover:[stroke-width:15]" />
        </div>
      </div>
      <div className="overflow-hidden max-h-0 duration-1000 group-[.is-active]:max-h-[250px]">
        <img
          src={item.author_headshot}
          alt=""
          className="w-16 h-16 float-left mr-4 m-1"
        />
        <div className="mb-3 text-slate-700 font-extralight text-sm">
          By <span className=" font-medium">{item.author_essay}</span>
        </div>
        <div className="line-clamp-3 font-extralight leading-7 tracking-wide hover:text-[rgb(168,79,0)] mb-8">
          <Link href={item.essay}>{item.desc}</Link>
        </div>
      </div>
    </div>
  );
}
