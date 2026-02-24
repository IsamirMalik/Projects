import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import createContact from "../controllers/contact.controllers.js";

const router = Router();

router
  .route("/")
  .post(isLoggedIn, createContact);

export default router;