import type { Request, Response } from "express";
import { PostService } from "../services/post.service.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import type { Post } from "@prisma/client";

export const PostController = {
  getPost: async (req: AuthRequest, res: Response) => {
    try {
      const post = await PostService.getAllPosts();
      if (!post) {
        throw new Error("Nenhum post encontrado");
      }
      res.status(200).json(post);
    } catch (error) {
      console.error("ERRO DETALHADO:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Ocorreu um erro desconhecido." });
      }
    }
  },

  createPost: async (req: AuthRequest, res: Response) => {
    const { title, content, published } = req.body;
    const user = req.user;

    try {
      if (!title) {
        throw new Error("Um titulo e necessario!");
      }

      if (!content) {
        throw new Error("A publicação prcisa de um conteúdo!");
      }

      const post: Omit<Post, "id" | "createdAt" | "updatedAt"> = {
        title,
        content,
        published: true,
        authorId: user?.userId as number,
      };
      const newPost = await PostService.create(post);
      res.status(201).json(newPost);
    } catch (error) {
      console.error("ERRO DETALHADO:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Ocorreu um erro desconhecido." });
      }
    }
  },

  deletePost: async (req: AuthRequest, res: Response) => {
    const authorId = req.user?.userId as number;
    const { id } = req.body;

    try {
      const postsAuthor = await PostService.getPostByAuthor(authorId);
      if (!postsAuthor?.find((p) => p.id === id)) {
        throw new Error("Você não tem permição para deletar esse post");
      }
      const post = await PostService.deletePostById(id, authorId);

      res.status(200).json({ message: "Publicação deletado com sucesso." });
    } catch (error) {
      console.error("ERRO DETALHADO:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Ocorreu um erro desconhecido." });
      }
    }
  },

  updatePost: async (req: AuthRequest, res: Response) => {
    const { id, title, content, published } = req.body;
    const authorId = req.user?.userId as number;
    try {
      const postsAuthor = await PostService.getPostByAuthor(authorId);
      if (!postsAuthor?.find((p) => p.id === id)) {
        throw new Error("Você não tem permição para atualizar esse post");
      }
      const newUser = await PostService.updatePost(id, {
        title,
        content,
        published,
      });
      res.status(201).json(newUser);
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
