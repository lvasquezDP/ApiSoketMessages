import { NextFunction, Request, Response } from "express";
import { validTypes } from "../../config";

export const FileTypes = (pos:number) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const type = req.url.split('/').at(pos)??'';
      if (!validTypes.includes(type))
        return res
          .status(400)
          .json({ errors: `invalid type: ${type}, valid ones ${validTypes}` });
      return next();
    } catch (errors) {
      return res.status(401).json({ errors });
    }
  };
