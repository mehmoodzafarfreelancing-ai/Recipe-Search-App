// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Make a box named recipes, start it empty ( [] ), and give me a button called setRecipes to fill it later.
  const [recipes, setRecipes] = useState([]);
 // Make a box named isLoading, start it with true, and allow me to turn it to false later.
  const [isLoading, setIsLoading] = useState(true);
 // make a box named error set it null and fill it if something goes wrong
  const [error, setError] = useState(null);

  // NEW: State for the search bar
 // create a box named searchQuery, start it with string (chicken) and then allow me to chane it later using setSearchQuery.
  const [searchQuery, setSearchQuery] = useState("chicken");









  
  // We moved the fetch logic into a reusable function
  const fetchRecipes = async (query) => {
    setIsLoading(true);
    setError(null); // Clear old errors
    try {
      // We inject the 'query' variable into the URL dynamically
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      // The API returns 'null' if it finds nothing, so we check for that
      if (data.meals === null) {
        setRecipes([]); // clear the list
        setError("No recipes found. Try another ingredient!");
      } else {
        setRecipes(data.meals);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes.");
    } finally {
      setIsLoading(false);
    }
  };

  // Run the search ONCE when the app starts (defaulting to "chicken")
  useEffect(() => {
    fetchRecipes("chicken");
  }, []);

  // NEW: Handle the form submission
  const handleSearch = (e) => {
    e.preventDefault(); // Stop the page from reloading
    fetchRecipes(searchQuery); // Call the API with the text in the box
  };

  return (
    <div className="app-container">
      <h1>Recipe Finder</h1>

      {/* NEW: The Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter ingredient (e.g., beef)..."
          value={searchQuery}
          // This updates the state every time you type a letter
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* The Recipe Grid */}
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
            {/* Show image and title */}
            <img src={recipe.strMealThumb} alt={recipe.strMeal} width="150" />
            <h3>{recipe.strMeal}</h3>
            <p>Category: {recipe.strCategory}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
