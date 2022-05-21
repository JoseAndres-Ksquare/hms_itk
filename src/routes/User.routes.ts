import { Router, Request, Response } from "express";
import { createUser } from "../firebase/methods";
import { hasRole } from "../middlewares/hasRole";
import { isAuth } from "../middlewares/isAuthenticated";
import { disableUser } from "../firebase/methods";

export const UserRouter = Router();

UserRouter.post("/", async (req: Request, res: Response) => {
  const { email, password, role, isDisabled } = req.body;

  if (!email || !password || !role || isDisabled === undefined) {
    res.status(400);
    return res.send({ error: "All fields are required" });
  }
  if (role === "Admin" || role === "Doctor") {
    res.status(400);
    return res.send({ error: "Invalid role" });
  }
  try {
    const userId = await createUser(email, password, role, isDisabled);
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
    allowSameUser: false,
  }),
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { isDisabled } = req.body;

    if (isDisabled === undefined || isDisabled === null) {
      return res.status(400).send({
        error: "no fields to update",
      });
    }

    try {
      const user = await disableUser(userId, isDisabled);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);
