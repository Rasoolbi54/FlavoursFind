



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMealContext } from "../pages/Context";

function RecipeDetails() {
  const { id } = useParams(); 
  const [meal, setMeal] = useState(null);
  const { favorites, toggleFavorite } = useMealContext(); 
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch meal details from API
  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setMeal(data.meals ? data.meals[0] : null);
    };
    fetchMeal();
  }, [id]);

  // Check if meal is already in favorites
  useEffect(() => {
    if (meal) {
      setIsFavorite(favorites.some((fav) => fav.idMeal === meal.idMeal)); 
    }
  }, [meal, favorites]);

  // Loading state when meal is being fetched
  if (!meal) return (
    <div className="flex  ms-96 ps-24 items-center justify-center my-40">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-500 border-gray-300"></div>
    </div>
  )

  return (
    <div className="meal-details-container w-full px-4 py-8 md:px-8 md:py-12 bg-white rounded-lg shadow-xl space-y-8">
      {/* Main Container - Flexbox Layout for Image and Info */}
      <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8">

        {/* Image Section (Left side on large screens) */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Information Section (Right side) */}
        <div className="w-full md:w-2/3 space-y-6 flex flex-col justify-between">
          {/* Meal Title */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">{meal.strMeal}</h2>
          </div>

          {/* Ingredients Section - Buttons Style */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Ingredients:</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.keys(meal)
                .filter((key) => key.includes("strIngredient") && meal[key])
                .map((key) => (
                  <button
                    key={key}
                    className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    {meal[key]}
                  </button>
                ))}
            </div>
          </div>

          {/* Instructions Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800">Instructions:</h3>
            <p className="text-lg text-gray-700 mt-2 leading-relaxed">{meal.strInstructions}</p>
          </div>

          {/* Favorite Button */}
          <div className="mt-4">
            <button
              onClick={() => toggleFavorite(meal)} 
              className={`favorite-btn px-6 py-3 rounded-md ${
                isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {isFavorite ? "Remove" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      {/* Video Section (if available) */}
      {meal.strYoutube && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800">Watch How to Make:</h3>
          <div className="mt-4">
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`}
              title="Recipe Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="bg-gray-100 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Additional Information:</h3>
        <ul className="space-y-4 mt-4">
          {/* Category and Area */}
          <li>
            <strong>Category:</strong> {meal.strCategory || "N/A"}
          </li>
          <li>
            <strong>Area:</strong> {meal.strArea || "N/A"}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RecipeDetails;
