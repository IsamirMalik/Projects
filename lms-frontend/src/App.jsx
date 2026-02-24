import "./App.css";
import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth.jsx";
import Contact from "./Pages/Contact.jsx";
import CourseDescription from "./Pages/Course/CourseDescription.jsx";
import CourseList from "./Pages/Course/CourseList.jsx";
import CreateCourse from "./Pages/Course/CreateCourse.jsx";
import AddLecture from "./Pages/Dashboard/AddLecture.jsx";
import DisplayLectures from "./Pages/Dashboard/DisplayLectures.jsx";
import Denied from "./Pages/Denied.jsx";
import Home from "./Pages/HomePage.jsx";
import Checkout from "./Pages/Payment/Checkout.jsx";
import CheckoutFailure from "./Pages/Payment/CheckoutFailure.jsx";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import EditProfile from "./Pages/User/EditProfile.jsx";
import Profile from "./Pages/User/Profile.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/course" element={<CourseList />} />
      <Route path="/course/description" element={<CourseDescription />} />

      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/editprofile" element={<EditProfile />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/fail" element={<CheckoutFailure />} />

        <Route path="/course/displaylectures" element={<DisplayLectures />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path="/course/create" element={<CreateCourse />} />
        <Route path="/course/addlecture" element={<AddLecture />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      <Route path="/contact" element={<Contact />} />
      <Route path="/denied" element={<Denied />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
