import { Router, Request, Response } from "express";
import { createUser, disableUser } from "../firebase/methods";
import { hasRole } from "../middlewares/hasRole";
import { isAuth } from "../middlewares/isAuthenticated";

export const UserRouter = Router();

UserRouter.post("/", async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    res.status(400);
    return res.send({ error: "All fields are required" });
  }
  if (role === "Admin" || role === "Doctor") {
    res.status(400);
    return res.send({ error: "Invalid role" });
  }
  try {
    const userId = await createUser(email, password, role, false);
    res.status(201).send({
      userId,
    });
  } catch (error) {
    res.status(500).send({ error: "something went wrong" });
  }
});

UserRouter.delete(
  "/:userId",
  isAuth,
  hasRole({
    roles: ["Admin"],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const user = await disableUser(userId, true);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

UserRouter.post(
  "/createAdmin",
  isAuth,
  hasRole({ roles: [""], allowSameUser: true }),

  async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      res.status(400);
      return res.send({ error: "All fields are required" });
    }
    if (role !== "Admin") {
      res.status(400);
      return res.send({ error: "Invalid role" });
    }
    try {
      const userId = await createUser(email, password, role, false);
      res.status(201).send({
        userId,
      });
    } catch (error) {
      res.status(500).send({ error: "something went wrong" });
    }
  }
);
