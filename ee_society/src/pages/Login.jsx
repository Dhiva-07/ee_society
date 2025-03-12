import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "./login.css";
function Login() {

  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try{
        const url = "http://localhost:8080/auth/login"
        const response = await fetch(url , {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(loginInfo)
        })
        const result = await response.json();
        const {success , message , jwtToken , name , error, isAdmin} = result;
        if(success){
            handleSuccess(message);
            localStorage.setItem('token' , jwtToken);
            localStorage.setItem('loggedInUser' , name);
            localStorage.setItem('isAdmin' , isAdmin);
            setTimeout(() => {
                navigate('/home');
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
    const copyloginInfo = {...loginInfo};
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter Your Email..."
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter Your Password..."
            value={loginInfo.password}
          />
        </div>
        <button>Login</button>
        <span>
          Don't have an account ?<Link to="/signup">SignUp</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
