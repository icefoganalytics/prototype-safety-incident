import express, { Request, Response } from "express";
import { param } from "express-validator";
import { ReturnValidationErrors } from "../middleware";
import { IncidentService } from "../services";

export const incidentRouter = express.Router();

const db = new IncidentService();

incidentRouter.get("/", async (req: Request, res: Response) => {
  res.json({ data: await db.getAll() });
});

incidentRouter.put("/:id", [param("id").notEmpty()], ReturnValidationErrors, async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.update(parseInt(id), req.body);

  res.json({ data: req.body });
});

incidentRouter.post("/", async (req: Request, res: Response) => {
  await db.create(req.body);

  res.json({ data: req.body });
});

incidentRouter.delete("/:id", async (req: Request, res: Response) => {
  res.json({});
});
