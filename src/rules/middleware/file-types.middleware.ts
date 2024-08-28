import { NextFunction, Request, Response } from "express";
import { validExt } from "../../config";

export const FileTypes = (pos:number) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const type = req.url.split('/').at(pos)??'';
      if (!validExt.includes(type))
        return res
          .status(400)
          .json({ errors: `invalid type: ${type}, valid ones ${validExt}` });
      return next();
    } catch (errors) {
      return res.status(401).json({ errors });
    }
  };
