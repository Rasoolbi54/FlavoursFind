



import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();

  // Check if the current route is the RecipeDetails page
  const isRecipeDetailsPage = location.pathname.includes("/recipe-details");

  return (
    <div>
      {/* Only render DesktopSidebar and MobileSidebar if not on RecipeDetails page */}
      {/* {!isRecipeDetailsPage && <DesktopSidebar />} */}
      {!isRecipeDetailsPage && <MobileSidebar />}
    </div>
  );
}

// const DesktopSidebar = () => {
//   return (
//     <div className="p-3 md:p-10  border-r min-h-screen w-24 md:w-0 hidden sm:block">
//       <div className="flex flex-col gap-20 sticky top-10 left-0">
//         <div className=''>
//         <div className="flex fixed  top-12 left-3 items-center justify-start space-x-2">
//           <p className="text-3xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600 tracking-wider drop-shadow-lg">
//             Flavours Find
//           </p>
//         </div>

//         </div>
//         <ul className="flex flex-col mt-36 items-center fixed md:items-start gap-8">
//           <Link to={"/"} className="flex gap-1">
//             <span className="bi bi-house-door "></span>
//             <span className="font-bold hidden md:block">Home</span>
//           </Link>
//           <Link to={"/favorites"} className="flex gap-1">
//           <span className="bi bi-heart "></span>
//             <span className="font-bold hidden md:block">Favorites</span>
//           </Link>
//         </ul>
//       </div>
//     </div>
//   );
// };

const MobileSidebar = () => {
  return (
    <div className="flex justify-center gap-10 border-t fixed w-full bottom-0 left-0 bg-white z-10 p-3 sm:hidden">
      <Link to={"/search"}>
        <span className="bi bi-search" ></span>
      </Link>
      <Link to={"/favorites"}>
        <span className="bi bi-heart"></span>
      </Link>
    </div>
  );
};

export default SideBar;










// import React from "react";
// import { Link} from "react-router-dom";

// function SideBar() {




//   return (
//     <div>
    
//      <DesktopSidebar />
//      <MobileSidebar />
//     </div>
//   );
// }

// const DesktopSidebar = () => {
//   return (
//     <div className="p-5 md:p-8 border-r min-h-screen w-64 sm:block bg-gradient-to-r from-indigo-600 to-indigo-800 text-white sticky top-0 z-50">
//       <div className="flex flex-col gap-20">
//         <div className="w-full text-center">
//           <p className="text-3xl font-bold tracking-wider">Flavours Find</p>
//         </div>
//         <ul className="flex flex-col items-center md:items-start gap-8 mt-10">
//           <Link to={"/"} className="sidebar-link flex gap-2 p-3 hover:bg-indigo-500 rounded-lg transition-colors">
//             <span className="bi bi-house-door text-xl"></span>
//             <span className="hidden md:block">Home</span>
//           </Link>
//           <Link to={"/favorites"} className="sidebar-link flex gap-2 p-3 hover:bg-indigo-500 rounded-lg transition-colors">
//             <span className="bi bi-heart text-xl"></span>
//             <span className="hidden md:block">Favorites</span>
//           </Link>
//         </ul>
//       </div>
//     </div>
//   );
// };

// const MobileSidebar = () => {
//   return (
//     <div className="flex justify-between gap-10 border-t fixed w-full bottom-0 left-0 bg-indigo-600 text-white z-10 p-2 sm:hidden">
//       <Link to={"/"}>
//         <span className="bi bi-house-door text-3xl hover:text-gray-200"></span>
//       </Link>
//       <Link to={"/favorites"}>
//         <span className="bi bi-heart text-3xl hover:text-gray-200"></span>
//       </Link>
//     </div>
//   );
// };

// export default SideBar;
