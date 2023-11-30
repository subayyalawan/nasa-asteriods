import React, { useState } from "react";
import { auth } from "../firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [signInDetails, setSignInDetails] = useState({
    email: "",
    password: "",
  });
  const [signInErr, setSignInErr] = useState(" ");

  const handleSignIn = async () => {
    if (!signInDetails.email || !signInDetails.password) {
      setSignInErr("please Enter Correct Values");
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
          setSignInErr(err.message);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="shadow-md bg-white container mx-auto flex justify-center items-center py-12">
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
            <input
              type="checkbox"
              name="rememberMe"
              className="accent-[#f14536] h-4 w-4"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 font-sans font-semibold"
            >
              Remember Me
            </label>
          </div>

          <div className="text-[#f14536] font-sans font-semibold text-center my-6 h-6 capitalize">
            {signInErr}
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={handleSignIn}
              className="text-white bg-[#f14536] px-24 py-4 block hover:bg-[#b7352a]"
            >
              Sign In
            </button>
          </div>

          <p className="text-[#f14536] font-sans font-semibold text-center my-6 cursor-pointer">
            <Link to="/signup">Dont Have An Account yet?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
