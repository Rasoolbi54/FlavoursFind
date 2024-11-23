import React, { createContext, useState, useEffect, useContext } from "react";

// Create Context
const MealContext = createContext();

// Custom hook to use the MealContext
export const useMealContext = () => useContext(MealContext);

// MealProvider Component
export const MealProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  // Toggle favorite functionality
  const toggleFavorite = (meal) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.idMeal === meal.idMeal);
      const updatedFavorites = isFavorite
        ? prev.filter((fav) => fav.idMeal !== meal.idMeal)
        : [...prev, meal];

      // Store the updated list of favorites in localStorage
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  };

  return (
    <MealContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </MealContext.Provider>
  );
};
