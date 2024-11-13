// import PostCard from "./PostCard";
// import { useState } from "react";

// const HomeContent = () => {
//   const [activeTab, setActiveTab] = useState("All");
//   const tabs = [
//     "All",
//     "Origination Post",
//     "Alumni Post",
//     "Student Post",
//     "Facility Post",
//   ];
//   const postText = `
//   In this extensive post, we delve deep into the crucial aspect of risk
//   management in trading and investing. From understanding risk types to
//   implementing effective risk mitigation strategies, we cover everything you
//   need to know to safeguard your investments and optimize your portfolio's
//   performance. Don't miss out on this invaluable resource for traders and
//   investors alike! #RiskManagement #InvestingInsights #PortfolioProtection
// `;

//   const postImages = ["https://picsum.photos/900/400/?blur"];

//   return (
//     <div className=" w-1/2">
//       <div className="flex border border-gray-300 justify-around bg-white rounded-2xl shadow-lg px-4 py-1 m-4  ">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`text-sm px-4 py-2 rounded-full font-semibold ${
//               activeTab === tab ? "text-black font-bold" : "text-gray-500"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>
//       <div className="w-full bg-[#ffffff] p-4  h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar">
//         <PostCard text={postText} images={postImages} />
//         <PostCard text={postText} images={postImages} />
//         <PostCard text={postText} images={postImages} />
//         <PostCard text={postText} images={postImages} />
//         {/* Add more PostCard components as needed */}
//       </div>
//     </div>
//   );
// };

// export default HomeContent;

const EventContent = () => {
  return <div>EventContent</div>;
};

export default EventContent;
