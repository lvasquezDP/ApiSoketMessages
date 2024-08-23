import { UploadedFile } from "express-fileupload";
import { CategoryModel, UserModel } from "../../data";
import { MessageModel } from "../../data/mongo/models/messages.model";
import { CustomError } from "../../rules";
import { messageUserDTO } from "../../rules/dtos/User/message-user.dto";
import { messagesUserDTO } from "../../rules/dtos/User/messages-user.dto";
import { WssService } from "./wss.service";
import path from "path";

export class UserService {
  constructor() {}

  public async sendMessage(DTO: messageUserDTO) {
    try {
      const message = await MessageModel.create(DTO);
      if (message.img) {
        message.img = `http://192.168.137.241:3000/${message.img}`;
      }
      const user = await UserModel.findOne({ _id: DTO.emisor });
      WssService.instance.sendMessage(
        "message-user",
        { message, user },
        DTO.receptor
      );
      return message;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  public async getMessages(DTO: messagesUserDTO) {
    try {
      const messages = await MessageModel.find({
        $or: [
          { receptor: DTO.receptor, emisor: DTO.emisor },
          { receptor: DTO.emisor, emisor: DTO.receptor },
        ],
      });
      return messages.map((x) => {
        if (x.img) {
          x.img = `http://192.168.137.241:3000/${x.img}`;
        }
        return x;
      });
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
