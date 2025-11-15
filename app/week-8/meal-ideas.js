"use client";

import { useState, useEffect } from "react";

async function fetchMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("error while fetching meals: ", error);
    return [];
  }
}

async function fetchMealDetails(mealId) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error occured while fetching meal details: ", error);
    return null;
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [ingredientList, setIngredientList] = useState([]);

//   async function loadMealIdeas() {
//     if (!ingredient) return;
//     const mealData = await fetchMealIdeas(ingredient);
//     setMeals(mealData);
//   }

  useEffect(() => {
    async function loadMealIdeas() {
      setSelectedMeal(null);
      setIngredientList([]);

      if (!ingredient) return;
      const ideas = await fetchMealIdeas(ingredient);
      setMeals(ideas);
    }
    loadMealIdeas();
  }, [ingredient]);

  async function handleMealClick(meal) {
    setSelectedMeal(meal);
    setIngredientList([]);
    const details = await fetchMealDetails(meal.idMeal);
    if (!details) return;

    const extracted = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = details[`strIngredient${i}`];
      const measure = details[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        extracted.push(`${ingredient} (${(measure || "").trim()})`);
      }
    }

    setIngredientList(extracted);
  }

  return (
    <div className="text-white p-4">
      <h2 className="text-xl font-bold mb-2">Meal Ideas</h2>
      {!ingredient && <p>select an item to see meal ideas</p>}

      {ingredient && meals.length === 0 && (
        <p>No meal ideas found for {ingredient}.</p>
      )}

      {meals.length > 0 && (
        <div>
          <p className="mb-2">Here are some meal ideas using {ingredient}: </p>
          <ul className="space-y-2">
            {meals.map((meal) => (
              <li
                key={meal.idMeal}
                className={`bg-slate-800 rounded-lg p-2 cursor-pointer border ${
                  selectedMeal?.idMeal === meal.idMeal
                    ? "border-blue-400"
                    : "border-slate-700"
                } hover:bg-slate-700 transition`}
                onClick={() => handleMealClick(meal)}
              >
                <h3 className="font-semibold">{meal.strMeal}</h3>

                {selectedMeal?.idMeal === meal.idMeal &&
                  ingredientList.length > 0 && (
                    <div className="mt-2 ml-4 text-sm text-gray-300">
                      <p className="font-medium mb-1">Ingredients needed: </p>
                      <ul className="list-disc ml-4">
                        {ingredientList.map((ing, index) => (
                          <li key={index}>{ing}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
