import { NextFunction, Request, Response } from "express";

export const ContainFiles =(req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files || Object.keys(req.files).length == 0)
        return res.status(400).json({ errors: "No files were selected" });

      if (!Array.isArray(req.files.file)) req.body.files = [req.files.file];
      else req.body.files = req.files.file;
      return next();
    } catch (errors) {
      return res.status(401).json({ errors });
    }
  };
