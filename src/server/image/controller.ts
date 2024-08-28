import { Request, Response } from "express";
import { CustomError } from "../../rules";
import { UploadedFile } from "express-fileupload";
import { ImageService } from "../services/image.service";

export class ImageController {
  constructor(private readonly service: ImageService) {}

  private handleError = (errors: unknown, res: Response) => {
    if (errors instanceof CustomError)
      return res.status(errors.code).json(errors.getError);
    return res.status(400).json({ errors });
  };

  getImage = (req: Request, res: Response) => {
    this.service
      .getImage(req.params.id)
      .then((x) => res.send(x))
      .catch((e) => this.handleError(e, res));
  };
}
