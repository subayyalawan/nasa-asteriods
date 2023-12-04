import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import UpperBody from "./UpperBody";
import { auth } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if(user){
            setUserName(user.displayName)
            setUserEmail(user.email)
        }
        else{
            navigate('/signin')
        }
    });
    return () => unsubscribe()
  }, []);

  return (
    <>
      <Navbar userName={userName} />
      <div className="bg-gray-100 min-h-screen">
        <UpperBody userEmail={userEmail}/>
      </div>
    </>
  );
}

export default Dashboard;
