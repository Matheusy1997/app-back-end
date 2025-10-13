import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export const AuthController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    try {
      const token = await AuthService.login(email, password);
      
      res.status(200).json({ token });
    } catch (error: any) {
      if(error.message == "Email ou senha inválidos.") {
        return res.status(401).json({ message: error.message })
      }
      return res.status(400).json({ message: error.message });
    }
  },
};
