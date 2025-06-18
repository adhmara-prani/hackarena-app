import express from "express";
import dataRoutes from "./routes/data.routes.js";

const app = express();

app.use("/api/data", dataRoutes);

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
