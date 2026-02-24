import { Router } from "express";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
import { buySubscription, cancelSubscription, getAllSubscriptions, getRazorpayKey, verifySubscription } from "../controllers/payment.controllers.js";


const router = Router();

router
  .route("/razorpay-key")
  .get(isLoggedIn, getRazorpayKey);

router
  .route('/subscribe')
  .post(isLoggedIn, buySubscription);

router
  .route('/verify')
  .post(isLoggedIn, verifySubscription);

router
  .route('/unsubscribe')
  .post(isLoggedIn, cancelSubscription);

router
  .route('/')
  .get(isLoggedIn, authorizedRoles("ADMIN"), getAllSubscriptions);

export default router;