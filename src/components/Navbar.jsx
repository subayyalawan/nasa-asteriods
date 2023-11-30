import React from "react";
import { auth } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";

const Navbar = ({userName}) => {
  const navigate = useNavigate()

  const handleSignOut = async() =>{
    await auth.signOut()
    .then(()=>{
      navigate("/signin")
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <>
      <div className="bg-white fixed inset-x-0 top-0 shadow-lg ">
        <div className="px-8 py-3 flex justify-between text-xl">
          <div className="navbar-logo">
            <h3 className="font-bold uppercase text-gray-900 cursor-pointer">
              NASA <span className="font-medium text-sm">(Asteriods)</span>
            </h3>
          </div>

          <div className="navbar-personal-info flex text-gray-500 text-base">
            <p className="cursor-pointer" >Hello! {userName}</p>
            <span className="px-4">|</span>
            <p onClick={handleSignOut} className="cursor-pointer">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
