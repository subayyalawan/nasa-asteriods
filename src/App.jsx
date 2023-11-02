import React from "react";
import Navbar from "./components/Navbar";
import Body from "./components/UpperBody";
import './App.css';

function App() {
  return (
    <>
      <div className="bg-gray-50 h-screen">
        <Navbar />
        <Body/>
      </div>
    </>
  );
}

export default App;
