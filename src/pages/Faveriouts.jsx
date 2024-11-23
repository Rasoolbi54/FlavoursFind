import React from "react";
import RecipieCard from "../componenets/RecipieCard"; // Assuming you have this component for individual meal card
import { useMealContext } from "./Context";

function Favorites() {
  const { favorites } = useMealContext(); // Access favorites from context

  return (
    <div className="favorites-page px-4 py-8">
      <h2 className="text-3xl font-bold text-center -ms-28 mb-8">Favorite Meals</h2>

      <div className="favorites-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.length > 0 ? (
          favorites.map((meal) => (
            <RecipieCard key={meal.idMeal} meal={meal} />
          ))
        ) : (
          <div className="flex justify-center ms-96 ps-30 items-center w-full h-80">
          <p className="text-center text-lg font-semibold text-gray-500">
            No favorite meals added yet.
          </p>
        </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
