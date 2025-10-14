import type { Post } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export const PostService = {
  getAllPosts: async (): Promise<Post[] | null> => {
    return prisma.post.findMany({ where: {published: true } });
  },

  getPostsByTitle: async (title: string): Promise<Post[] | null> => {
    return prisma.post.findMany({ where: { title, published: true } });
  },

  getPostByAuthor: async(authorId: number): Promise<Post[] | null> => {
    return prisma.post.findMany({ where: { authorId } })
  },

  create: async (
    post: Omit<Post, "id" | "createdAt" | "updatedAt">
  ): Promise<Post> => {
    return prisma.post.create({ data: post });
  },

  deletePostById: async (id: number, authorId: number): Promise<Post> => {
    return prisma.post.delete({ where: { id, authorId } });
  },

  updatePost: async(id:number, post: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">): Promise<Post> => {
    return prisma.post.update({ where: {id}, data: {title: post.title, content: post.content, published: post.published}})
  },
};
