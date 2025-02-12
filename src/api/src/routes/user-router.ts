import express, { Request, Response } from "express";
import { param } from "express-validator";
import { ReturnValidationErrors } from "../middleware";
import { UserService } from "../services";
import _ from "lodash";
import { checkJwt, loadUser } from "../middleware/authz.middleware";

export const userRouter = express.Router();
userRouter.use(checkJwt, loadUser);

const db = new UserService();

userRouter.get("/me", async (req: Request, res: Response) => {
  let me = await db.getByEmail(req.user.email);

  return res.json({ data: me });
});

userRouter.get("/", async (req: Request, res: Response) => {
  let list = await db.getAll();

  for (let user of list) {
    user.display_name = `${user.first_name} ${user.last_name}`;
  }

  return res.json({ data: list });
});

userRouter.put(
  "/:email",
  [param("email").notEmpty().isString()],
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    let { email } = req.params;
    let { roles, status, is_admin, scopes } = req.body;

    let existing = await db.getByEmail(email);

    if (existing) {
      existing.status = status;
      existing.roles = roles;
      existing.is_admin = is_admin;

      await db.update(email, existing);

      return res.json({
        messages: [{ variant: "success", text: "User saved" }],
      });
    }

    res.status(404).send();
  }
);

userRouter.post("/", async (req: Request, res: Response) => {
  let { email } = req.body;
  let existing = await db.getByEmail(email);
  if (existing) {
    return res.status(409).send();
  }
  let user = await db.create(req.body);
  return res.json(user);
});

userRouter.delete("/:id", [param("id").notEmpty()], ReturnValidationErrors, async (req: Request, res: Response) => {
  let { id } = req.params;

  await db.delete(id);

  let list = await db.getAll();
  return res.json({
    data: list,
    messages: [{ variant: "success", text: "User removed" }],
  });
});

// this will be removed when the application is deployed
userRouter.get("/make-admin/:email/:key", async (req: Request, res: Response) => {
  let user = await db.getByEmail(req.params.email);

  let { email, key } = req.params;

  if (key != process.env.SECRET) {
    return res.status(403).send("Your key is invalid");
  }

  if (user) {
    console.log(`KEY MATCHES, making ${email} an admin`);
    user.roles = ["Admin"];
    //await db.update(email, user);
  }

  res.send("Done");
});
