// import React from "react";
// import Navbar from "./components/Navbar";
// import UpperBody from "./components/UpperBody";
// import "./App.css";

// function App() {
//   return (
//     <>
//       <Navbar />
//       <div className="bg-gray-100 min-h-screen">
//         <UpperBody />
//       </div>
//     </>
//   );
// }

// export default App;

import React from "react";
import "./App.css"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Signin from "./components/signin";
import Layout from "./components/Layout";
import Signup from "./components/Signup";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
      </Route>
    )
  );

  return (
  <>
    <RouterProvider router={router}/>
  </>);
};

export default App;
