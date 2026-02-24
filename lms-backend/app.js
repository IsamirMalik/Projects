import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import courseRoutes from "./routes/course.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
  })
);

app.use(cookieParser());

// Test route
app.use("/ping", (req, res) => {
  res.send("pong");
});

// Routes for different modules

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/admin", adminRoutes);



// undefined Routes
app.use(errorMiddleware);

app.all("{*splat}", (req, res) => {
  res.status(404).send("Not Found");
});


export default app;