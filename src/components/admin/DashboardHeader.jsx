// import {
//   Search,
//   Bell,
//   CalendarDays,
// } from "lucide-react";

// function DashboardHeader() {
//   const hour = new Date().getHours();

//   let greeting = "Good Evening";

//   if (hour < 12) greeting = "Good Morning";
//   else if (hour < 17) greeting = "Good Afternoon";

//   const today = new Date().toLocaleDateString("en-IN", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   return (
//     <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 shadow-xl">

//       <div className="flex flex-col xl:flex-row justify-between gap-8">

//         {/* Left */}

//         <div>

//           <h1 className="text-5xl font-bold text-white">

//             {greeting}, Administrator 👋

//           </h1>

//           <p className="text-slate-300 text-lg mt-4">

//             Welcome back to Sanvi Business Consultancy Dashboard.

//           </p>

//           <div className="flex items-center gap-2 mt-5 text-slate-400">

//             <CalendarDays size={18} />

//             {today}

//           </div>

//         </div>

//         {/* Right */}

//         <div className="flex items-center gap-4">

//           {/* Search */}

//           <div className="relative">

//             <Search
//               className="absolute left-4 top-4 text-gray-400"
//               size={18}
//             />

//             <input
//               type="text"
//               placeholder="Search anything..."
//               className="w-80 bg-white rounded-2xl pl-12 pr-4 py-4 outline-none"
//             />

//           </div>

//           {/* Notification */}

//           <button className="relative w-14 h-14 rounded-2xl bg-white flex items-center justify-center">

//             <Bell />

//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">

//               3

//             </span>

//           </button>

//           {/* Profile */}

//           <div className="bg-white rounded-2xl px-5 py-3 flex items-center gap-4 shadow">

//             <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-xl">

//               AD

//             </div>

//             <div>

//               <h3 className="font-bold">

//                 Administrator

//               </h3>

//               <p className="text-gray-500">

//                 System Admin

//               </p>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default DashboardHeader;