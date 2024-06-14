import cors from "cors";
import express, { Request, Response } from "express";
import "express-async-errors";
import moment from "moment-timezone";
import { router } from "./routes";

const app = express();
app.use(express.json());

app.use(cors());
app.use(router);

app.use((err: Error, req: Request, res: Response) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

process.env.TZ = "America/Sao_Paulo";
moment.tz.setDefault("America/Sao_Paulo");

app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) || 8000 : 8000,
});

console.log("Servidor iniciado");
