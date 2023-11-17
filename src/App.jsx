import React from "react";
import Navbar from "./components/Navbar";
import UpperBody from "./components/UpperBody";
import "./App.css";
import Favourite from "./components/Favourite";

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <UpperBody />
      </div>
    </>
  );
}

export default App;
