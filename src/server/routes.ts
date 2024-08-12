import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { CategoryRoutes } from "./category/routes";
import { ProductRoutes } from "./product/routes";
import { UploadRoutes } from "./upload/routes";
import { ImageRoutes } from "./image/routes";
import { AuthMiddleware } from "../rules/middleware/auth.middleware";

import { GithubController } from "./github/controller";
import { GithubSha256Middleware } from "../rules";
import { UserRoutes } from "./Users/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api", AuthMiddleware.validateJWT, this.api);

    //webHook not implemented in 100%, set envs 
    router.post(
      "/api/GitHub/",
      GithubSha256Middleware.verifySignature,
      new GithubController().webHook
    );

    return router;
  }

  static get api(): Router {
    const router = Router();

    router.use("/category", CategoryRoutes.routes);
    router.use("/product", ProductRoutes.routes);
    router.use("/files", UploadRoutes.routes);
    router.use("/images", ImageRoutes.routes);
    router.use("/user", UserRoutes.routes);

    return router;
  }
}
