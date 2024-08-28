import { Router } from "express";
import { UserController } from "./Controller";
import { UserService } from "../services/User.service";
import { MessageFiles } from "../../rules/middleware/message-upload.middleware";

export class UserRoutes {
  static get routes(): Router {
    const router = Router(); 

    const controller = new UserController(
      new UserService()
    );
    router.use(MessageFiles);
    // Definir las rutas
    router.post("/sendMessage", controller.sendMessage);
    router.post("/getMessages", controller.getMessages);
    

    return router;
  }
}
