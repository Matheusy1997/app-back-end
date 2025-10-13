import { prisma } from "../lib/prisma.js";
import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export const UserService = {
  findAll: async (): Promise<User[]> => {
    return prisma.user.findMany();
  },

  findById: async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({ where: { id } });
  },

  create: async (
    data: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> => {
    const hashPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({ 
      data: {
        ...data,
        password: hashPassword,
      } });
  },

  deleteById: async (id: number): Promise<User> => {
    return prisma.user.delete({ where: { id } });
  },

  updateByEmail: async (
    email: string,
    data: Omit<User, "id" | "updatedAt">
  ): Promise<User> => {
    return prisma.user.update({
      where: { email },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  },
};
