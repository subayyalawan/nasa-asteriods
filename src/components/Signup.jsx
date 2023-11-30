import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    confPass: "",
  });
  const [signUpErr, setSignUpErr] = useState(" ");

  const handleSignUp = async () => {
    if (
      !signUpDetails.name ||
      !signUpDetails.email ||
      !signUpDetails.password ||
      !signUpDetails.confPass
    ) {
      setSignUpErr("please enter all the details in their fields");
    } else {
      if (signUpDetails.password != signUpDetails.confPass) {
        setSignUpErr("passwords doesn't match");
      } else {
        await createUserWithEmailAndPassword(
          auth,
          signUpDetails.email,
          signUpDetails.password
        )
        .then((resp) => {
          updateProfile(resp.user, {
            displayName: signUpDetails.name,
          });
          navigate("/");
        })
        .catch((err)=>{
          setSignUpErr(err.message)
        })
        
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="shadow-md bg-white container mx-auto py-12">
          <div>
            <h3 className="pb-12 font-sans capitalize text-2xl font-semibold text-center">
              You Did it!
              <br />
              Tell us about yourself
            </h3>
            <div className="my-6 flex justify-center">
              <div className="mx-4 w-1/3">
                <label htmlFor="name" className="font-sans font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  name="name"
                  className="w-full p-3 rounded font-sans font-semibold outline-none border"
                  required
                  value={signUpDetails.name}
                  onChange={(e) =>
                    setSignUpDetails({
                      ...signUpDetails,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mx-4 w-1/3">
                <label htmlFor="email" className="font-sans font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  className="w-full p-3 rounded font-sans font-semibold outline-none border"
                  required
                  value={signUpDetails.email}
                  onChange={(e) =>
                    setSignUpDetails({
                      ...signUpDetails,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="my-6 flex justify-center">
              <div className="mx-4 w-1/3">
                <label htmlFor="password" className="font-sans font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  className="w-full p-3 rounded font-sans font-semibold outline-none border"
                  required
                  value={signUpDetails.password}
                  onChange={(e) =>
                    setSignUpDetails({
                      ...signUpDetails,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mx-4 w-1/3">
                <label htmlFor="confPass" className="font-sans font-semibold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Your Password"
                  name="confPass"
                  className="w-full p-3 rounded font-sans font-semibold outline-none border"
                  required
                  value={signUpDetails.confPass}
                  onChange={(e) =>
                    setSignUpDetails({
                      ...signUpDetails,
                      confPass: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="text-[#f14536] font-sans font-semibold text-center my-6 h-6 capitalize">
              {signUpErr}
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={handleSignUp}
                className="text-white bg-[#f14536] px-24 py-4 hover:bg-[#b7352a]"
              >
                Sign Up
              </button>
            </div>

            <p className="text-[#f14536] font-sans font-semibold text-center my-6 cursor-pointer capitalize">
              <Link to="/signin">Already have an account?</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
