import { NextFunction, Request, Response } from "express";
import { JWT } from "../../plugins";

interface User {
  email: string;
  id: string;
  iat: number;
  exp: number;
}

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ errors: "No token provided" });
    if (!token.startsWith("Bearer "))
      return res.status(401).json({ errors: "Token provided not valid" });

    try {
      req.body.user = await JWT.validateToken<User>(
        token.replace("Bearer ", "")
      );
      return next();
    } catch (errors) {
      return res.status(401).json({ errors });
    }
  }
}
