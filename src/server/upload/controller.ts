import { Request, Response } from "express";
import { CustomError } from "../../rules";
import { FileUploadService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";

export class UploadController {
  constructor(private readonly service: FileUploadService) {}

  private handleError = (errors: unknown, res: Response) => {
    if (errors instanceof CustomError)
      return res.status(errors.code).json(errors.getError);
    return res.status(400).json({ errors });
  };

  avatar = (req: Request, res: Response) => {
    const file = req.body.files.at(0) as UploadedFile;

    this.service
      .avatar(file,req.body.user.id)
      .then((up) => res.json(up))
      .catch((e) => this.handleError(e, res));
  };

  imagen = (req: Request, res: Response) => {
    const file = req.body.files.at(0) as UploadedFile;

    this.service
      .imagen(file,req.body.user.id)
      .then((up) => res.json(up))
      .catch((e) => this.handleError(e, res));
  };

  upload = (req: Request, res: Response) => {
    const file = req.body.files.at(0) as UploadedFile;

    this.service
      .uploadSingle(file,req.body.user.id)
      .then((up) => res.json(up))
      .catch((e) => this.handleError(e, res));
  };

  uploads = (req: Request, res: Response) => {
    const file = req.body.files as UploadedFile[];
    
    this.service
      .uploadMultiple(file,req.body.emisor)
      .then((up) => res.json(up))
      .catch((e) => this.handleError(e, res));
  };
}
