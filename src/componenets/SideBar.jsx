



import React from "react";
import { Link} from "react-router-dom";

function SideBar() {


  return (
    <div>
    
      <MobileSidebar />
    </div>
  );
}


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









