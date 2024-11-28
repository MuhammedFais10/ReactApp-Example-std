import express from "express";
import dataRouter from "./src/Router/data.router.js";
import userRouter from "./src/Router/userData.js";

import cors from "cors";
import { dbconnect } from "./src/config/database.connection.js";

const app = express();
const PORT = 4000;

app.use(cors());

dbconnect();
app.use(express.json());

app.use("/api/data", dataRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
