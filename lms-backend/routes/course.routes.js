import { Router } from "express";
import { getAllCourses, createCourse, updateCourse, getLecturesByCourseId, removeCourse, addLecturesByCourseId, deleteLecture } from "../controllers/course.controllers.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

// Debug middleware to log all incoming requests
router.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

router.route("/")
  .get(getAllCourses)
  .post(isLoggedIn, authorizedRoles("ADMIN"), upload.single("thumbnail"), createCourse)
  .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteLecture);

router.route("/:id")
  .get(isLoggedIn, getLecturesByCourseId)
  .put(isLoggedIn, authorizedRoles("ADMIN"), updateCourse)
  .delete(isLoggedIn, authorizedRoles("ADMIN"), removeCourse)
  .post(isLoggedIn, authorizedRoles("ADMIN"), upload.single("lecture"), addLecturesByCourseId);




export default router;