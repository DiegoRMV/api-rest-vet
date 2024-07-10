import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import userRouter from "./routes/user.route.js";
import petRouter from "./routes/pet.route.js";
import vetRouter from "./routes/vet.route.js";
import cartRouter from "./routes/cart.route.js";
import productRouter from "./routes/product.route.js";
import publicRouter from "./routes/public.route.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", publicRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/pets", petRouter);
app.use("/api/v1/vets", vetRouter);
app.use("/api/v1/products", productRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Servidor andando en " + PORT));
