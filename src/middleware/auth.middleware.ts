import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

// 1. (Opcional, mas recomendado) Crie uma interface para o payload do seu token
interface MyTokenPayload extends JwtPayload {
  userId: number;
  userName: string;
  userEmail: string;
}

// Interface para estender o objeto Request do Express
export interface AuthRequest extends Request {
  user?: { userId: number, userName: string, userEmail: string  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Nenhum token fornecido." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token esta vazio." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as unknown as MyTokenPayload;
    req.user = { userId: decoded.userId, userName: decoded.userName, userEmail: decoded.userEmail };
    next();
  } catch (error) {
    res.status(401).json({ message: "token inválido." });
  }
};
