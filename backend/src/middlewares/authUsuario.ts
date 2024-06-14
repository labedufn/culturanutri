import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
  tipo: string;
}

export function authUsuario(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "Token de autenticação não fornecido." });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.SECRET_KEY) as Payload;

    req.usuario_id = sub;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token de autenticação inválido ou expirado." });
  }
}

export function authCriarUsuario(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "Token de autenticação não fornecido." });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub, tipo: tipoUsuarioAutenticado } = verify(token, process.env.SECRET_KEY) as Payload;

    req.usuario_id = sub;

    if (tipoUsuarioAutenticado === "ADMINISTRADOR") {
      return next();
    } else if (tipoUsuarioAutenticado === "GESTOR") {
      return next();
    } else {
      return res.status(403).json({ message: "Usuário não tem permissão para criar este tipo de usuário." });
    }
  } catch (err) {
    return res.status(401).json({ message: "Token de autenticação inválido ou expirado." });
  }
}
