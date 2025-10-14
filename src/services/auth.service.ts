import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ValidationService } from "./validation.service.js";

export const AuthService = {
  login: async (email: string, pass: string): Promise<string | null> => {
    ValidationService.validateEmail(email)
    ValidationService.validatePassword(pass)
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const token = jwt.sign(
      { userId: user.id, userName: user.name, userEmail: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return token;
  },
};
