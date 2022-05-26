"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const admin = __importStar(require("firebase-admin"));
const models_1 = require("./models");
const Profile_routes_1 = require("./routes/Profile.routes");
const User_routes_1 = require("./routes/User.routes");
const Patient_routes_1 = require("./routes/Patient.routes");
const Doctor_routes_1 = require("./routes/Doctor.routes");
const Appointment_routes_1 = require("./routes/Appointment.routes");
const Admin_routes_1 = require("./routes/Admin.routes");
dotenv_1.default.config();
admin.initializeApp();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const db_name = process.env.DB_NAME;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_hostname = process.env.DB_HOST;
//middleware
app.use(express_1.default.json());
//routes
app.use("/profile", Profile_routes_1.ProfileRouter);
app.use("/user", User_routes_1.UserRouter);
app.use("/patient", Patient_routes_1.PatientRouter);
app.use("/doctor", Doctor_routes_1.DoctorRouter);
app.use("/appointment", Appointment_routes_1.AppointmentRouter);
app.use("/admin", Admin_routes_1.AdminRouter);
app.get("/", (req, res) => {
    res.send("hola mundo!");
});
app.listen(PORT, () => {
    try {
        (0, models_1.initSequelize)(db_name, db_username, db_password, db_hostname);
        console.log("Server listening on port " + PORT);
    }
    catch (error) {
        console.error(error);
        process.abort();
    }
});
