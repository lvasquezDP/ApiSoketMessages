import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
import { EmailService } from "../../plugins";
import { envs } from "../../config";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new AuthController(
      new AuthService(
        new EmailService(
          envs.MAILER_SERVICE,
          envs.MAILER_EMAIL,
          envs.MAILER_SECRET_KEY,
          envs.SEND_EMAIL
        )
      )
    );

    // Definir las rutas
    router.post("/login", controller.login);
    router.post("/register", controller.register);
    router.get("/validate-email/:token", controller.validate);

    return router;
  }
}
