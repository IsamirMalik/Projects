import React, { use } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/slices/authSlice.js";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const role = useSelector((state) => state?.auth?.role);

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    // console.log(drawerSide);
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    console.log(drawerSide);
    drawerSide[0].style.width = 0;
  }

  async function handleLogout(e) {
    e.preventDefault();

    const response = await dispatch(logout());
    if (response?.payload?.data) navigate("/");
  }

  return (
    <div>
      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 h-full w-48 sm:w-80 bg-base-200 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={"24px"} />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>

            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}

            <li>
              <Link to="/course">All Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            {!isLoggedIn && (
              <li className="absolute w-[90%] bottom-4">
                <div className="w-full flex items-center justify-center">
                  <button className="btn-primary bg-blue-600 font-semibold px-4 py-1 rounded-md w-full">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="btn-secondary bg-pink-600 font-semibold px-4 py-1 rounded-md w-full">
                    <Link to="/signup">signup</Link>
                  </button>
                </div>
              </li>
            )}
            {isLoggedIn && (
              <li className="absolute w-[90%] bottom-4">
                <div className="w-full flex items-center justify-center">
                  <button className="btn-primary bg-blue-600 font-semibold px-4 py-1 rounded-md w-full">
                    <Link to="/user/profile">Profile</Link>
                  </button>
                  <button className="btn-secondary bg-pink-600 font-semibold px-4 py-1 rounded-md w-full">
                    <Link onClick={handleLogout}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
}

export default HomeLayout;
