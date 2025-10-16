import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";
import { ValidationService } from "../services/validation.service.js";

export const AuthController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    try {
      ValidationService.validateEmail(email)
      ValidationService.validatePassword(password)
      const token = await AuthService.login(email, password);
      
      res.status(200).json({ token });
    } catch (error) {
      console.error("ERRO DETALHADO:", error);

      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Ocorreu um erro desconhecido." });
      }
      
    }
  },
};
