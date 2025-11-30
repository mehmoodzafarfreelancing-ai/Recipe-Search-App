// src/App.jsx
import { useState, useEffect, useEffectEvent } from "react";
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
  // This function is used where time is needed like (fetching data)
  const fetchRecipes = async (query) => {
    // Set a box having button setIsLoading to true
    setIsLoading(true);
    // Set a box having button setError to true
    setError(null); // Clear old errors

    // Block of code where we try to do something (that might fail)
    try {
      // We inject the 'query' variable into the URL dynamically
      // Wait for fetching to be finished before contuning but donot freeze anything else
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );

      // if the request send to the server is failed then show the error (Network response was not ok)
      if (!response.ok) throw new Error("Network response was not ok");

      // Wait for response.json() to be ready when javascript object will be ready then save it inside data.
      const data = await response.json();

      // The API returns 'null' if it finds nothing, so we check for that
      // If data returns no meals then:
      if (data.meals === null) {
        // clear the list
        setRecipes([]); // clear the list
        // Then set to error (No recipes found. Try another ingredient!)
        setError("No recipes found. Try another ingredient!");
      } else {
        // Show meals of data in recepies box
        setRecipes(data.meals);
      }
    } catch (err) {
      // If try{} failed then run this catch block of code. (err) is the erroe/details of what failed
      // Write error in console in red so that it can be seen easily
      console.error(err);
      // Set error to (Failed to fetch recipes)
      setError("Failed to fetch recipes.");
    } finally {
      // Finally means run this at last of try and catch even if something runs or fails
      // Set isloading to false (stop the loading)
      setIsLoading(false);
    }
  };

  // Run the search ONCE when the app starts (defaulting to "chicken")
  // Run this code once when component appears on the screen
  useEffect(() => {
    // fetch recepies named chicken
    fetchRecipes("chicken");
  }, []);

  // NEW: Handle the form submission
  // Create a function and save it inside handleSearch
  const handleSearch = (e) => {
    // When event happens then stop page from reloading
    e.preventDefault();
    // Call the function fetchRecipes and give it parameter (searchQuery).
    fetchRecipes(searchQuery);
  };

  return (
    <div className="app-container">
      <h1>Recipe Finder</h1>
      {/* NEW: The Search Form */}
      {/*Create search form and when the user submit the form (click search or press enter inside form)
      then trigger handleSearch() function. */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter ingredient (e.g., beef)..."
          // Show what is inside usestate in the inputbox
          value={searchQuery}
          //Every time we type a letter state is updated
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* If isLoading is true then create a paragraph tag. */}
      {isLoading && <p>Loading...</p>}
      If error(state variable) is null(has no value assigned) then create a
      paragraph tag(style its color to red and show value of error in it)
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* The Recipe Grid */}
      <div className="recipe-grid">
        {/* recipes.map for every recepie in the recepie array create a UI card  */}
        {/* (recipe) => one item from the array (Object) */}
        {/* (...) what to display for that recepie (JSX) */}
        {recipes.map((recipe) => (
          // Give each card a unique key
          <div key={recipe.idMeal} className="recipe-card">
            {/* Show image and title */}
            {/* Show recipe thumbnail picture from API */}
            <img src={recipe.strMealThumb} alt={recipe.strMeal} width="150" />
            {/* Show recipe title from API */}
            <h3>{recipe.strMeal}</h3>
            {/*    Show category of recipe from API */}
            <p>Category: {recipe.strCategory}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
