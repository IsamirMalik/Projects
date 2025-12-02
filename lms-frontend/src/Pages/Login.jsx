import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../Components/HomeLayout";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handelUserInput(e) {
    const { name, value } = e.target;
    console.log(name, value);

    setLoginData({
      ...loginData,
      [name]: value,
    });
  }  

  async function onLogin(event) {
    event.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("All fields are required");
      return;
    }         

    if(loginData.email && loginData.password){
        const email = loginData.email;
        const password = loginData.password;

        const userEmail = JSON.parse(localStorage.getItem("email"));
        const userPassword = JSON.parse(localStorage.getItem("password"));

        if(email == userEmail && password == userPassword){
          console.log("Logged in successfully");
            navigate("/");
        }
    }

    // dispatch create account action
    // const response = await dispatch(login(loginData));
    // console.log(response)
    // if (response?.payload?.success) {
    //   navigate("/");
    // }

    // setLoginData({
    //   email: "",
    //   password: "",
    // });


    toast.success("Logged in successfully");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          onSubmit={onLogin}
          noValidate
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Login Page</h1>
          
          {/* <div className="flex flex-col gap-1">
            <label htmlFor="full_name" className="font-semibold">
              Full Name
            </label>
            <input
              type="text"
              required
              id="full_name"
              name="full_name"
              placeholder="Enter your full name here"
              className="bg-transparent px-2 py-1 border rounded-sm"
              onChange={handelUserInput}
              value={loginData.full_name}
            />
          </div> */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              id="email"
              name="email"
              placeholder="Enter your email here"
              className="bg-transparent px-2 py-1 border rounded-sm"
              onChange={handelUserInput}
              value={loginData.email}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              id="password"
              name="password"
              placeholder="Enter your password here"
              className="bg-transparent px-2 py-1 border rounded-sm"
              onChange={handelUserInput}
              value={loginData.password}
            />
          </div>
          <button
            className=" font-semibold bg-yellow-700 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-1 text-black text-lg rounded-sm cursor-pointer"
            type="submit"
          >
            Login
          </button>
          <p className="text-center">
            Do not have an account ?{" "}
            <Link to="/signup" className="text-yellow-600 cursor-pointer">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
