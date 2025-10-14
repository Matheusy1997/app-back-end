import type { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import bcrypt from "bcryptjs";

export const UserController = {
  getUser: async (req: AuthRequest, res: Response) => {
    try {
      const id = req.user?.userId;
      const user = await UserService.findById(id as number);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário." });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const { email, name, password } = req.body;
      const newUser = await UserService.create({ email, name, password });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar usuário." });
    }
  },

  deleteUserById: async (req: AuthRequest, res: Response) => {
    const id = req.user?.userId as number;
    const { pass } = req.body
    try {
      const user = await UserService.findById(id)
      if(!user) {
        throw new Error("token invalido.")
      }
      const authPassword = await bcrypt.compare(pass, user.password)
      if(!authPassword) {
        throw new Error("Você não tem permição para excluir esse usuário.")
      }
      const deleteUser = await UserService.deleteById(id);
      res.status(200).json({ message: "Usuário deletado com sucesso."});
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const { name, email, password, createdAt } = req.body;
      const newUser = await UserService.updateByEmail(email, {
        name,
        email,
        password,
        createdAt,
      });
      res.status(201).json(newUser)
    } catch (error) {
      res
        .status(500)
        .json({ message: "Não foi possivel atualizar o usuário." });
    }
  },
};
