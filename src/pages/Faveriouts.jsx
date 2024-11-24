import React from "react";
import RecipieCard from "../componenets/RecipieCard"; 
import { useMealContext } from "./Context";

function Favorites() {
  const { favorites } = useMealContext(); 
  return (
    <div className="px-4 py-8">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-8">Favorite Meals</h2>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((meal) => (
            <RecipieCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-80">
          <p className="text-lg font-semibold text-gray-500 text-center">
            No favorite meals added yet.
          </p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
