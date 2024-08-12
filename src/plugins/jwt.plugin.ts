import jwt from "jsonwebtoken";
import { envs } from "../config";

const JWT_SEED=envs.JWT_SEED;

export class JWT {
  static generateToken(payload: object, duration: string = "2h") {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        resolve(token);
      });
    });
  }
  static validateToken<T>(token: string):Promise<T> {
    return new Promise((resolve,reject) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) return reject('Invalid token');
        resolve(decoded as T);
      });
    });
  }
}
