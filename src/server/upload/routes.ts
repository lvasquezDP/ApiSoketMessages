import { Router } from "express";
import { UploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";
import { ContainFiles } from "../../rules";
import { FileTypes } from "../../rules/middleware/file-types.middleware";

export class UploadRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new UploadController(
      new FileUploadService()
    );
    router.use(ContainFiles);
    router.use(FileTypes(2));
    // Definir las rutas
    router.post("/single/:type", controller.upload);
    router.post("/multiple/:type", controller.uploads);

    return router;
  }
}
