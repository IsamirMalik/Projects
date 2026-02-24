import { Router } from "express";
import { isLoggedIn, authorizedRoles } from "../middlewares/auth.middleware.js";
import { getUsersStatsData } from "../controllers/admin.controllers.js";

const router = Router();

// Get all users with subscription and revenue details
router.get(
  "/stats/users",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  getUsersStatsData
);

export default router;
