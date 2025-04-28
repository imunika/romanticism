export default function Heading({ children }) {
  return (
    <div className="grid grid-cols-12 pt-10 pb-2 px-8">
      <div className="col-span-1 md:col-span-2 lg:col-span-3"></div>
      <div className="col-span-10 md:col-span-8 lg:col-span-6">
        <h1 className={"font-healvetica font-light pb-3 text-5xl"}>
          {children}
        </h1>
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-3"></div>
    </div>
  );
}
// export default function Heading({ children }) {
//   return (
//     <div className="grid grid-cols-12 pt-10 pb-2 px-8">
//       <div></div>
//       <div className="md:col-span-6 col-span-8">
//         <h1 className={"font-healvetica font-light pb-3 text-5xl"}>
//           {children}
//         </h1>
//       </div>
//       <div></div>
//     </div>
//   );
// }
