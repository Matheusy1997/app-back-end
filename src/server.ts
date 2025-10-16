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

const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : []

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if(!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  } 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());

app.use("/api/auth", AuthRouters);
app.use("/api", UserRoutes);
app.use("/api", PostRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em => http://localhost:${port}`);
});
