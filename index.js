import express from "express";
import fileUpload from "express-fileupload";
import DATABASE from "./database/db.js";
import dotenv from "dotenv";
import CORS from "cors";
import patientRoute from "./routes/patient.route.js";
import userRoute from "./routes/user.route.js";
import programRoute from "./routes/program.route.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = process.env.port || 4000;

//middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//File Upload
app.use(fileUpload());

//CORS
app.use(CORS());

//Database connection
DATABASE();

//Routes
app.get("/", async (req, res) => {
  res.send({
    message: `Server is running on port: ${port}`,
  });
});

app.use("/api/patients", patientRoute);
app.use("/api/user", userRoute);
app.use("/api/exams", programRoute);

app.listen(4000, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
