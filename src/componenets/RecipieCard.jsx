import React from "react";
import { useMealContext } from "../pages/Context";
import { Link } from "react-router-dom";


function RecipieCard({ meal }) {
  const { favorites, toggleFavorite } = useMealContext(); 
  const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);  

  return (
    <div key={meal.idMeal} className="recipe-card bg-[#e9e8e9] p-4 rounded-lg shadow-md">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-xl font-semibold mt-4">{meal.strMeal}</h3>

      <div className="mt-4 flex gap-2 justify-end items-center">
        {/* View Details Button */}
        <Link
          to={`/recipe/${meal.idMeal}`} // Dynamically navigate based on the meal id
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          View Recipe
        </Link>

        {/* Toggle Favorite Button */}
        <button
          onClick={() => toggleFavorite(meal)} 
          className={`px-4 py-2 rounded-md ${
            isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-700"
          }`}
        >
          {isFavorite ?  <span className="bi bi-heart"></span> : <span className="bi bi-heart"></span>}
        </button>
      </div>
    </div>
  );
}

export default RecipieCard;
