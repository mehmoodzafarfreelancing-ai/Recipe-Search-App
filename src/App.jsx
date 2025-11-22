// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css'; // We'll add styles later

// This is the (free) API we will use
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken";

function App() {
  // 1. Create state variables to store our data
  const [recipes, setRecipes] = useState([]); // Will hold the array of recipes
  const [isLoading, setIsLoading] = useState(true); // To show a loading message
  const [error, setError] = useState(null); // To show an error message

  // 2. The 'useEffect' hook runs once when the component loads
  useEffect(() => {
    
    // 3. We define an 'async' function to fetch the data
    const fetchRecipes = async () => {
      try {
        // 'await' pauses the function until the data comes back
        const response = await fetch(API_URL);
        
        // Check if the network request was successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Convert the response to JSON
        
        console.log(data); // <-- LOOK IN YOUR BROWSER CONSOLE
        
        setRecipes(data.meals); // Store the 'meals' array in our state
        setIsLoading(false); // We're done loading

      } catch (e) {
        // If anything went wrong...
        console.error(e);
        setError("Failed to fetch recipes. Please try again.");
        setIsLoading(false); // Stop loading, even on error
      }
    };

    fetchRecipes(); // Call the function

  }, []); // The empty array [] means "only run this effect once on load"

  // 4. This is the UI (the "View")
  return (
    <div>
      <h1>Recipe Finder</h1>
      
      {/* Show a loading message */}
      {isLoading && <p>Loading recipes...</p>}
      
      {/* Show an error message */}
      {error && <p>{error}</p>}
      
      {/* Show the recipes once they are loaded */}
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.idMeal}>
            {recipe.strMeal}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;