import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";

/*function App() {
  useScrollToTop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          const responseData = await response.json();
          setUserData(responseData);
          setIsLoggedOut(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
        
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
      <Footer />
    </div>
  );
}*/

export default App;
