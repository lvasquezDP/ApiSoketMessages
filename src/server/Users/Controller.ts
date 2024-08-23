import { Request, Response } from "express";
import { CustomError } from "../../rules";
import { messageUserDTO } from "../../rules/dtos/User/message-user.dto";
import { UserService } from "../services/User.service";
import { messagesUserDTO } from "../../rules/dtos/User/messages-user.dto";
import { UploadedFile } from "express-fileupload";

export class UserController {
  constructor(private readonly service: UserService) {}

  private handleError = (errors: unknown, res: Response) => {
    if (errors instanceof CustomError)
      return res.status(errors.code).json(errors.getError);
    return res.status(400).json({ errors });
  };

  sendMessage = (req: Request, res: Response) => {
    const { errors, data } = messageUserDTO.create(req.body);
    if (errors) return this.handleError(errors, res);
    this.service
      .sendMessage(data!)
      .then((message) => res.json(message))
      .catch((err) => this.handleError(err, res));
  };
  getMessages = (req: Request, res: Response) => {
    const { errors, data } = messagesUserDTO.create(req.body);
    if (errors) return this.handleError(errors, res);
    this.service
      .getMessages(data!)
      .then((message) => res.json(message))
      .catch((err) => this.handleError(err, res));
  };
}
