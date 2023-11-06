import React from "react";
import Navbar from "./components/Navbar";
import UpperBody from "./components/UpperBody";
import "./App.css";
import Favourite from "./components/Favourite";

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 h-screen">
        <UpperBody />
      </div>
    </>
  );
}

export default App;
