import express from "express";
import cors from "cors";

import plotRoutes from "./routes/plotRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import allocationRoutes from "./routes/allocationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/plots", plotRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/allocations", allocationRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);




export default app;