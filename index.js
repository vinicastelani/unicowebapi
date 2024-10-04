import express from "express";
import DATABASE from "./database/db.js";
import dotenv from "dotenv";
import CORS from "cors";
import patientRoute from "./routes/patient.route.js";
dotenv.config();

const app = express();
const port = process.env.port || 4000;

//middleware
app.use(express.json());

//CORS
app.use(CORS());

//Database connection
DATABASE();

//Routes
app.get("/", async (req, res) => {
  res.send({
    message: `Server is running on ${port}`,
  });
});

app.use("/api/patients", patientRoute);

app.listen(4000, () => {
  console.log(`Server is running on ${port}`);
});
