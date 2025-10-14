import express from "express";
import type { Request, Response } from "express";
import "dotenv/config";
import UserRoutes from "./routes/user.routes.js";
import AuthRouters from "./routes/auth.routes.js";
import PostRoutes from "./routes/post.routes.js";
import helmet from "helmet";
import cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api/auth", AuthRouters);
app.use("/api", UserRoutes);
app.use("/api", PostRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hellow World!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em => http://localhost:${port}`);
});
