import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../Components/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signUpData, setSignUpData] = useState({
    full_name: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handelUserInput(e) {
    const { name, value } = e.target;
    console.log(name, value);

    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  }

  function handelUserImage(e) {
    e.preventDefault();
    const image = e.target.files[0];

    if (image) {
      setSignUpData({
        ...signUpData,
        avatar: image,
      });
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    fileReader.onload = () => {
      console.log(fileReader.result);
      setPreviewImage(fileReader.result);
    };
  }

  function createNewAccount(event) {
    event.preventDefault();

    if (!signUpData.full_name || !signUpData.email || !signUpData.password) {
      toast.error("All fields are required");
      return;
    }

    if (signUpData.full_name.length < 5) {
      toast.error("full_name must be at least 5 characters");
      return;
    }

    if (
      !signUpData.email.match(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )
    ) {
      toast.error("Invalid email format");
      return;
    }

    if (
      !signUpData.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/
      )
    ) {
      toast.error(
        "Invalid password format , password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    const formData = new FormData();
    formData.append("full_name", signUpData.full_name);
    formData.append("email", signUpData.email);
    formData.append("password", signUpData.password);
    formData.append("avatar", signUpData.avatar);

    // dispatch create account action

    navigate("/");

    setSignUpData({
      full_name: "",
      email: "",
      password: "",
      avatar: "",
    });

    setPreviewImage("");

    toast.success("Account created successfully");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          onSubmit={createNewAccount}
          noValidate
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 m-auto rounded-full" />
            )}
          </label>
          <input
            id="image_uploads"
            name="image_uploads"
            className="hidden"
            type="file"
            accept=".jpg , .jpeg , .png , .svg"
            onChange={handelUserImage}
          />
          <div className="flex flex-col gap-1">
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
              value={signUpData.full_name}
            />
          </div>
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
              value={signUpData.email}
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
              value={signUpData.password}
            />
          </div>
          <button
            className=" font-semibold bg-yellow-700 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-1 text-black text-lg rounded-sm cursor-pointer"
            type="submit"
          >
            Create Account
          </button>
          <p className="text-center">
            Already have an account ?{" "}
            <Link to="/login" className="text-yellow-600 cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default SignUp;
