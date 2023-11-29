import React, { useState } from "react";
import { auth } from "../firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [signInDetails, setSignInDetails] = useState({
    email: "",
    password: "",
  });
  const [signInErr, setSignInnErr] = useState(" ");

  const handleSignIn = async () => {
    if (!signInDetails.email || !signInDetails.password) {
      setSignInnErr('please Enter Correct Values')
    } else {
      await signInWithEmailAndPassword(
        auth,
        signInDetails.email,
        signInDetails.password
      )
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          setSignInnErr(err);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white container mx-auto flex justify-center items-center py-12">
        <div className="w-1/3">
          <h3 className="pb-12 font-sans text-2xl font-semibold text-center">
            Welcome Back!
          </h3>
          <div className="mx-4 my-6">
            <label htmlFor="email" className="font-sans font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              className="w-full p-3 rounded font-sans font-semibold outline-none border"
              required
              value={signInDetails.email}
              onChange={(e) =>
                setSignInDetails({ ...signInDetails, email: e.target.value })
              }
            />
          </div>

          <div className="mx-4 my-6">
            <label htmlFor="password" className="font-sans font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              className="w-full p-3 rounded font-sans font-semibold outline-none border"
              required
              value={signInDetails.password}
              onChange={(e) =>
                setSignInDetails({ ...signInDetails, password: e.target.value })
              }
            />
          </div>

          <div className="mx-4 pb-12 flex items-center">
            <input type="checkbox" name="rememberMe" className="text-[#f14536] focus:ring-0 w-5 h-5 rounded"/>
            <label htmlFor="rememberMe" className="ml-2 font-sans font-semibold">Remember Me</label>
          </div>

          <div className="text-[#f14536] font-sans font-semibold text-center my-6">{signInErr}</div>

          <div className="flex justify-center items-center mt-">
            <button
              onClick={handleSignIn}
              className="text-white bg-[#f14536] px-24 py-4"
            >
              Sign In
            </button>
          </div>

          <div className="">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
