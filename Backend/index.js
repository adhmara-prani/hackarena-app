import express from "express";
import dataRoutes from "./routes/data.routes.js";
import dotenv from "dotenv"
const app = express();
dotenv.config();
app.use(express.json());
app.use("/api/data", dataRoutes);


app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
