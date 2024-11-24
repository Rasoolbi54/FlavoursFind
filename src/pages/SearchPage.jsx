import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipieCard from "../componenets/RecipieCard";
import { Link } from "react-router-dom";

function SearchPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filterType, setFilterType] = useState(""); // Tracks if it's a category or cuisine
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;

  // Fetch Filters (Categories and Cuisines)
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesRes, cuisinesRes] = await Promise.all([
          axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list"),
          axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list"),
        ]);
        setCategories(categoriesRes.data.meals || []);
        setCuisines(cuisinesRes.data.meals || []);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);

  // Fetch Meals by Ingredients
  const fetchMealsByIngredients = async (ingredients) => {
    setIsLoading(true);
    try {
      const ingredientList = ingredients.split(",").map((ingredient) => ingredient.trim());
      const ingredientMeals = await Promise.all(
        ingredientList.map(async (ingredient) => {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
          );
          return response.data.meals || [];
        })
      );
      const allMeals = ingredientMeals.flat();
      const uniqueMeals = allMeals.filter(
        (meal, index, self) => self.findIndex((m) => m.idMeal === meal.idMeal) === index
      );
      setRecipes(uniqueMeals);
    } catch (error) {
      console.error("Error fetching meals by ingredients:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Meals by Mood
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
      const uniqueMeals = [...new Map(moodResults.flat().map((meal) => [meal.idMeal, meal])).values()];
      setRecipes(uniqueMeals);
    } catch (error) {
      console.error(`Error fetching meals for mood "${selectedMood}":`, error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Meals by Filter (Category or Cuisine)
  const fetchMealsByFilter = async () => {
    setIsLoading(true);
    try {
      const endpoint =
        filterType === "category"
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedFilter}`
          : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedFilter}`;
      const response = await axios.get(endpoint);
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFilter) fetchMealsByFilter();
  }, [selectedFilter, filterType]);

  // Fetch Random Meals on Load
  useEffect(() => {
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
    fetchRandomMeals();
  }, []);

  // Handle Ingredient Search Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) fetchMealsByIngredients(searchQuery);
  };

  // Filter Meals by Time
  const filterMealsByTime = (meals) => {
    if (!selectedTime) return meals;
    return meals.filter((meal) => {
      const prepTime = meal.strPrepTime ? parseInt(meal.strPrepTime, 10) : 0;
      if (selectedTime === "lessThan30") return prepTime <= 30;
      if (selectedTime === "30to60") return prepTime > 30 && prepTime <= 60;
      if (selectedTime === "moreThan60") return prepTime > 60;
      return true;
    });
  };

  const filteredMeals = filterMealsByTime(recipes);

  // Sort Meals Alphabetically
  const sortRecipesByName = () => {
    setRecipes((prev) => [...prev].sort((a, b) => a.strMeal.localeCompare(b.strMeal)));
  };

  // Pagination Logic
  const displayedRecipes = filteredMeals.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  return (
    <div className="bg-cover bg-center bg-no-repeat p-5 flex-1 justify-center" style={{ backgroundColor: "#faf9fb" }}>
      {/* Search Section */}
      <div className="bg-white p-4 mb-2 flex-1 rounded-lg">
  <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
    <label className="input shadow-md flex items-center gap-2 w-full">
      <input
        type="text"
        className="text-sm md:text-md grow p-2"
        placeholder="Enter ingredients separated by commas (e.g., chicken, tomato)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className="bi bi-search" style={{ fontSize: "20px", padding: "5px" }}></button>
    </label>
    {/* Favorites Button */}
    <button className="p-2 bg-blue-500 text-white rounded-md">
      <Link to="/favorites">
        <span className="bi bi-heart"></span>
      </Link>
    </button>
  </form>
</div>



      
      {
        isLoading && (
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Adjust spinner size based on screen size */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent m-0"></div>
            </div>
          </div>
        )
      }

      {/* Filters Section */}
      <div className="flex gap-2">
        {/* Mood Filter */}
        <div className="mood-selector bg-white p-2 mb-4 rounded-lg hidden sm:block">
          <h3 className="font-bold text-lg mb-2">Select Mood:</h3>
          <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
            {["Comfort", "Healthy", "Quick", "Indulgent"].map((mood) => (
              <button
                key={mood}
                className={`px-3 py-1 text-sm rounded-md ${selectedMood === mood ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setSelectedMood(mood)}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Time Filter */}
        <div className="time-selector bg-white p-2 mb-4 rounded-lg hidden sm:block">
          <h3 className="font-bold sm:text-sm text-lg mb-2">Select Time:</h3>
          <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
            {["lessThan30", "30to60", "moreThan60"].map((time) => (
              <button
                key={time}
                className={`px-3 py-1 text-sm rounded-md ${selectedTime === time ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setSelectedTime(time)}
              >
                {time === "lessThan30" ? "Less than 30 mins" : time === "30to60" ? "30-60 mins" : "More than 60 mins"}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="category-selector bg-white p-2 mb-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Select Category:</h3>
          <select
            onChange={(e) => {
              setSelectedFilter(e.target.value);
              setFilterType("category");
            }}
            className="w-full border p-2 rounded text-sm"
          >
            <option value="">Choose Category</option>
            {categories.map((category) => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>

        {/* Cuisine Filter */}
        <div className="cuisine-selector bg-white p-2 mb-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Select Cuisine:</h3>
          <select
            onChange={(e) => {
              setSelectedFilter(e.target.value);
              setFilterType("cuisine");
            }}
            className="w-full border p-2 rounded text-sm"
          >
            <option value="">Choose Cuisine</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine.strArea} value={cuisine.strArea}>
                {cuisine.strArea}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sorting Section
      <div className="bg-white hidden sm:block p-4 mb-4 rounded-lg">
        <button onClick={sortRecipesByName} className="bg-blue-500 text-white px-4 py-2 rounded">
          Sort by Name
        </button>
      </div> */}


      {/* Recipes Grid */}
      <div className="grid grid-cols-1 mt-2 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {displayedRecipes.map((meal) => (
          <RecipieCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

   

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * recipesPerPage >= filteredMeals.length}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SearchPage;
