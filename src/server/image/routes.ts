import { Router } from "express";
import { ImageController } from "./controller";
import { ImageService } from "../services/image.service";
import { FileTypes } from "../../rules/middleware/file-types.middleware";

export class ImageRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new ImageController(
      new ImageService()
    );
    router.use(FileTypes(1));

    // Definir las rutas
    router.get("/:type/:name", controller.getImage);

    return router;
  }
}
