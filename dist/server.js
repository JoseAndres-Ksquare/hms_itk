"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
const user_route_1 = require("./routes/user.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const db_name = process.env.DB_NAME;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_hostname = process.env.DB_HOST;
//middleware
app.use(express_1.default.json());
//routes
app.use("/users", user_route_1.UserRouter);
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
