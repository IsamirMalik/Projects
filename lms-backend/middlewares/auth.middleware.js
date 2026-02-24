import jwt from "jsonwebtoken";
import AppError from "../utils/error.util.js";

const isLoggedIn = async (req, res, next) => {

  const { token } = req.cookies;

  const decoded = jwt.decode(token);

  // decoded.expiry = process.env.JWT_EXPIRY;
  // console.log("decoded Token", decoded);

  const expDate = new Date(decoded.exp * 1000);
  // console.log("Token expires at (Local):", expDate.toString());

  const now = Math.floor(Date.now() / 1000);

  // if (decoded.exp < now) {
  //   console.log("Token is expired!");
  // } else {
  //   console.log("Token is still valid.");
  // }


  // console.log(token);

  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }


  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = userDetails;
  next();
};

const authorizedRoles = (...roles) => async (req, res, next) => {

  const currentUserRoles = req.user.role;
  if (!roles.includes(currentUserRoles)) {
    return next(new AppError("You are not authorized to access this resource", 403));
  }
  next();
};



export {
  isLoggedIn,
  authorizedRoles
}