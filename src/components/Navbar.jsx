import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="bg-white fixed inset-x-0 top-0  shadow-lg ">
        <div className="px-8 py-3 flex justify-between text-xl">
          <div className="navbar-logo">
            <h3 className="font-bold uppercase text-gray-900 cursor-pointer">
              LOGO
            </h3>
          </div>

          <div className="navbar-personal-info flex text-gray-500 text-base">
            <p>Hello! Subayyal Ayub</p>
            <span className="px-4">|</span>
            <p>Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
