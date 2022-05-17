import express, { Response, Request } from "express";
import dotenv from "dotenv";
import { initSequelize } from "./models";
import { UserRouter } from "./routes/user.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const db_name = <string>process.env.DB_NAME;
const db_username = <string>process.env.DB_USERNAME;
const db_password = <string>process.env.DB_PASSWORD;
const db_hostname = <string>process.env.DB_HOST;

//middleware
app.use(express.json());

//routes

app.use("/users", UserRouter);

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
