import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipieCard from "../componenets/RecipieCard";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search ingredients
  const [selectedMood, setSelectedMood] = useState(""); // Mood filter
  const [selectedTime, setSelectedTime] = useState(""); // Time filter

  // Fetch meals by ingredients (single or multiple, comma-separated)
  const fetchMealsByIngredients = async (ingredients) => {
    setIsLoading(true);
    try {
      const ingredientList = ingredients.split(",").map((ingredient) => ingredient.trim());

      // Fetch meals for each ingredient
      const ingredientMeals = await Promise.all(
        ingredientList.map(async (ingredient) => {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
          );
          return response.data.meals || [];
        })
      );

      // Flatten and filter meals to include only those that contain all ingredients
      const allMeals = ingredientMeals.flat();
      const uniqueMeals = allMeals.filter((meal, index, self) => {
        return self.findIndex((m) => m.idMeal === meal.idMeal) === index;
      });

      setRecipes(uniqueMeals);
    } catch (error) {
      console.error("Error fetching meals by ingredients:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch meals by mood
  const fetchMealsByMood = async () => {
    if (!selectedMood) return;

    setIsLoading(true);
    try {
      const moodCategories = {
        Comfort: ["soup", "stew", "pasta"],
        Healthy: ["salad", "vegetarian", "light meal"],
        Quick: ["snack", "sandwich", "finger food"],
        Indulgent: ["dessert", "cake", "gourmet"],
      };

      const moodTags = moodCategories[selectedMood];
      const moodResults = await Promise.all(
        moodTags.map((tag) => fetchMealsByCategory(tag))
      );

      // Flatten the array of results and remove duplicates
      const uniqueMeals = [
        ...new Map(
          moodResults.flat().map((meal) => [meal.idMeal, meal])
        ).values(),
      ];

      setRecipes(uniqueMeals);
    } catch (error) {
      console.error(`Error fetching meals for mood "${selectedMood}":`, error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch meals by category (used by mood search)
  const fetchMealsByCategory = async (category) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      return response.data.meals || [];
    } catch (error) {
      console.error("Error fetching meals by category:", error);
      return [];
    }
  };

  // Fetch random meals on component load
  const fetchRandomMeals = async () => {
    setIsLoading(true);
    const fetchedMeals = [];
    try {
      for (let i = 0; i < 20; i++) {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/random.php`
        );
        fetchedMeals.push(response.data.meals[0]);
      }
      setRecipes(fetchedMeals);
    } catch (error) {
      console.error("Error fetching random meals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMeals();
  }, []);

  useEffect(() => {
    if (selectedMood) fetchMealsByMood();
  }, [selectedMood]);

  // Handle form submission for ingredient search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      fetchMealsByIngredients(searchQuery); // Fetch meals for ingredients
    }
  };

  // Handle time filter change
  const handleTimeFilter = (e) => {
    setSelectedTime(e.target.value);
  };

  // Filter recipes based on selected time
  const filterMealsByTime = (meals) => {
    if (!selectedTime) return meals;

    return meals.filter((meal) => {
      // Extract the prep time
      const prepTime = meal.strPrepTime ? parseInt(meal.strPrepTime, 10) : 0;
      if (selectedTime === "lessThan30") return prepTime <= 30;
      if (selectedTime === "30to60") return prepTime > 30 && prepTime <= 60;
      if (selectedTime === "moreThan60") return prepTime > 60;
      return true;
    });
  };

  const filteredMeals = filterMealsByTime(recipes);

  return (
    <div className="bg-cover bg-center bg-no-repeat   p-5 flex-1 justify-center" style={{ backgroundColor: "#faf9fb" }}>
      {/* Search by Ingredients */}
      <div className="bg-white p-4 mb-2 rounded-lg">
        <form onSubmit={handleSearchSubmit}>
          <label className="input shadow-md flex items-center gap-2">
            <input
              type="text"
              className="text-sm md:text-md grow p-2"
              placeholder="Enter ingredients separated by commas (e.g., chicken, tomato, onion)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bi bi-search" style={{ fontSize: "20px", padding: "5px" }}></button>
          </label>
        </form>
      </div>



     <div className="flex gap-2">
       
          {/* Mood Selector */}
          <div className="mood-selector bg-white p-2 mb-4">
            <h3 className="font-bold text-lg mb-2">Select Mood:</h3>
            <div className="flex gap-2 flex-wrap">
              {["Comfort", "Healthy", "Quick", "Indulgent"].map((mood) => (
                <button
                  key={mood}
                  className={`px-4 py-2 rounded-md ${selectedMood === mood ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  onClick={() => setSelectedMood(mood)}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* Time Filter */}
          <div className="time-selector bg-white p-2 mb-4">
            <h3 className="font-bold text-lg mb-2">Select Time:</h3>
            <div className="flex gap-2 flex-wrap">
              {["lessThan30", "30to60", "moreThan60"].map((time) => (
                <button
                  key={time}
                  className={`px-4 py-2 rounded-md ${selectedTime === time ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time === "lessThan30" ? "Less than 30 mins" : time === "30to60" ? "30-60 mins" : "More than 60 mins"}
                </button>
              ))}
            </div>
          </div>
     </div>

      {/* Recommended Recipes */}
      <p className="font-bold text-1xl md:text-3xl mt-1">Recommended Recipes</p>
      <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
        {selectedMood ? `Mood: ${selectedMood}` : "Popular Choices"}
      </p>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex items-center justify-center my-40">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-500 border-gray-300"></div>
        </div>
      )}

      {/* No Results Message */}
      {!isLoading && filteredMeals.length === 0 && (
        <p className="text-center text-lg font-semibold mt-5">No recipes found for the selected criteria.</p>
      )}

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 mt-2 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {filteredMeals.map((meal) => (
          <RecipieCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
