# 🥗 React Recipe Finder

A dynamic, responsive recipe search application built with **React**, **Vite**, and **CSS Grid**. This app consumes the TheMealDB API to allow users to search for recipes, view ingredients, and watch cooking tutorials.

🔴 **Live Demo:** [https://recipe-search-app-hazel.vercel.app/]

## 🚀 Features
- **Real-time API Data:** Fetches recipes dynamically based on user search.
- **Smart Fallback:** Automatically detects missing source links and redirects users to YouTube tutorials instead.
- **Responsive Design:** Uses CSS Grid to create a layout that adapts from mobile to desktop.
- **Error Handling:** Gracefully manages failed network requests and "no results" states.

## 🛠️ Tech Stack
- **Frontend:** React.js (Hooks: useState, useEffect)
- **Build Tool:** Vite
- **Styling:** CSS3 (Flexbox & Grid)
- **API:** TheMealDB

## 💡 What I Learned
Building this project taught me how to handle **asynchronous data fetching** in React. I implemented **conditional rendering** to handle inconsistent API data (like missing recipe links) and used **local state** to manage loading spinners and error messages for a better user experience.
