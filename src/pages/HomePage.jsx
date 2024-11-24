import React , {useState}from "react";
import { Link } from "react-router-dom";
import SideBar from "../componenets/SideBar";

function HomePage({setIsSidebarVisible}) {
   function handleGetStarted(){
    setIsSidebarVisible(true)
   }
    
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1820694690/vector/cooking-background-with-decorative-frame-horizontal-flyer-with-food-items-meal-ingredients.jpg?s=612x612&w=0&k=20&c=Eup2tjfKPjVgsu8MgnVwBhICoAtj_fGTOfquPOkDnWc=')",
        backgroundPosition: "center", // Ensure the image is centered
        backgroundSize: "cover", // Ensure the image covers the full screen
      }}
    >
      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-black p-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Flavours Find!</h1>
          <p className="text-lg mb-6">
            Discover delicious recipes based on ingredients, mood, time, or cuisine.
          </p>

          {/* Navigation Button */}
          <Link to="/search">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"  onClick={handleGetStarted}>
              Get Started
            </button>
          </Link>
        </div>
      </div>


    </div>
  );
}

export default HomePage;
