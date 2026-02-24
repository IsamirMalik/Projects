import { register, login, logout, getProfile, forgotPassword, resetPassword, changePassword , updateProfile } from "../controllers/user.controllers.js";
import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();


router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", isLoggedIn, getProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.post("/update-password", isLoggedIn, changePassword);
router.put("/update-profile", isLoggedIn, upload.single("avatar"), updateProfile);



export default router;