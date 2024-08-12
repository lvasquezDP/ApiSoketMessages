import { Router } from "express";
import { UserController } from "./Controller";
import { UserService } from "../services/User.service";

export class UserRoutes {
  static get routes(): Router {
    const router = Router(); 

    const controller = new UserController(
      new UserService()
    );
    // Definir las rutas
    router.post("/", controller.sendMessage);
    router.post("/getMessages", controller.getMessages);
    

    return router;
  }
}
