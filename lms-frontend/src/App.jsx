import './App.css'
import { Route, Routes } from 'react-router-dom'

import RequireAuth from './Components/Auth/RequireAuth';
import Contact from './Pages/Contact'
import CourseDescription from './Pages/Course/CourseDescription'
import CourseList from './Pages/Course/CourseList'
import CreateCourse from './Pages/Course/CreateCourse'
import AddLecture from './Pages/Dashboard/AddLecture'
import DisplayLectures from './Pages/Dashboard/DisplayLectures'
import Denied from './Pages/Denied'
import Home from './Pages/HomePage.jsx'
import Notfound from './Pages/Notfound'
import Checkout from './Pages/Payment/Checkout'
import CheckoutFailure from './Pages/Payment/CheckoutFailure'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp'
import EditProfile from './Pages/User/EditProfile'
import Profile from './Pages/User/Profile'
import AboutUs from './Pages/AboutUs';
import AdminDashboard from './Pages/Dashboard/AdminDashboard.jsx';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/course' element={<CourseList />} />
      <Route path='/course/description' element={<CourseDescription />} />

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

      <Route path='/contact' element={<Contact />} />
      <Route path='/denied' element={<Denied />} />
      <Route path='*' element={<Notfound />} />
    </Routes>
  )
}

export default App