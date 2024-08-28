import { NextFunction, Request, Response } from "express";

export const MessageFiles =(req: Request, res: Response, next: NextFunction) => {
    try {
      
      if (!req.files || Object.keys(req.files).length == 0)
        return next();

      if (!Array.isArray(req.files.files)) req.body.files = [req.files.files];
      else req.body.files = req.files.files;

      return next();
    } catch (errors) {
      return res.status(401).json({ errors });
    }
  };
