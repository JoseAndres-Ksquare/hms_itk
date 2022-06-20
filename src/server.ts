import express, { Response, Request } from "express";
import dotenv from "dotenv";
import * as admin from "firebase-admin";
import { initSequelize } from "./models";
import { ProfileRouter } from "./routes/Profile.routes";
import { UserRouter } from "./routes/User.routes";
import { PatientRouter } from "./routes/Patient.routes";
import { DoctorRouter } from "./routes/Doctor.routes";
import { AppointmentRouter } from "./routes/Appointment.routes";
import { AdminRouter } from "./routes/Admin.routes";
import cors from "cors";

dotenv.config();
admin.initializeApp();
const app = express();
const PORT = process.env.PORT || 5000;

const db_name = <string>process.env.DB_NAME;
const db_username = <string>process.env.DB_USERNAME;
const db_password = <string>process.env.DB_PASSWORD;
const db_hostname = <string>process.env.DB_HOST;

//middleware
app.use(cors());
app.use(express.json());

//routes

app.use("/profile", ProfileRouter);
app.use("/user", UserRouter);
app.use("/patient", PatientRouter);
app.use("/doctor", DoctorRouter);
app.use("/appointment", AppointmentRouter);
app.use("/admin", AdminRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("hola mundo!");
});

app.listen(PORT, () => {
  try {
    initSequelize(db_name, db_username, db_password, db_hostname);
    console.log("Server listening on port " + PORT);
  } catch (error) {
    console.error(error);
    process.abort();
  }
});
