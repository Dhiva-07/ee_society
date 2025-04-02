import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "./auth.css";
function Signup() {

  const [signupInfo, setsignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try{
        const url = "http://localhost:8080/auth/signup"
        const response = await fetch(url , {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(signupInfo)
        })
        const result = await response.json();
        const {success , message , error} = result;
        if(success){
            handleSuccess(message);
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } else if(error){
            const details = error?.details[0].message;
            handleError(details);
        }else if(!success){
            handleError(message);
        }
    }catch(err){
        handleError(err);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copysignupInfo = {...signupInfo};
    copysignupInfo[name] = value;
    setsignupInfo(copysignupInfo);
  };

  return (
    <div className="Lcontainer">
      <form onSubmit={handleSignup}>
      <h1>SignUp</h1>
        <div className="input-container">
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter Your Name..."
            value={signupInfo.name}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="input-container">
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter Your Email..."
            value={signupInfo.email}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-container">
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter Your Password..."
            value={signupInfo.password}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button className="loginbtn">Signup</button>
        <span>
          Already have an account ?<Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
