import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import nocache from "nocache";
import cookieParser from "cookie-parser";

import apiRoutes from "@routes/api.route";
import authRoutes from "@routes/auth.route";
import docsRoutes from "@routes/docs.route";

export async function index(app: express.Express): Promise<void> {
  return new Promise((resolve, reject) => {
    app.use(helmet());
    app.use(nocache());
    app.use(express.json());
    app.disable("x-powered-by");
    app.use(morgan("dev"));
    app.use(cookieParser());
    /*  app.use(
      cors({
        origin: [
          process.env.FRONTEND_BASE_URL as string,
          process.env.BACKEND_BASE_URL as string,
          process.env.LOCALHOST_URL as string,
        ],
        credentials: true,
      }),
    ); */

    app.use("/api", apiRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/docs", docsRoutes);

    resolve();
  });
}
