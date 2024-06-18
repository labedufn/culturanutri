import "dotenv/config";
import cors from "cors";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import moment from "moment-timezone";
import { router } from "./routes";

const app = express();
app.use(express.json());

app.use(cors());
app.use(router);

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(next);
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

const port = process.env.PORT ? Number(process.env.PORT) || 8000 : 8000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
