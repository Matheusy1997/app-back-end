import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export const AuthController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);

    if (!token) {
      return res.status(401).json({ message: "Email ou senha inválido!" });
    }

    res.status(200).json({ token });
  },
};
