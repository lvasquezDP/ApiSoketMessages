import { CategoryModel } from "../../data";
import { MessageModel } from "../../data/mongo/models/messages.model";
import { CustomError } from "../../rules";
import { messageUserDTO } from "../../rules/dtos/User/message-user.dto";
import { messagesUserDTO } from "../../rules/dtos/User/messages-user.dto";
import { WssService } from "./wss.service";

export class UserService {
  constructor() {}

  public async sendMessage(DTO: messageUserDTO) {
    try {
      const message = await MessageModel.create(DTO);
      WssService.instance.sendMessage(
        "message-user",
        { message },
        DTO.receptor
      );
      return message;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  public async getMessages(DTO: messagesUserDTO) {
    try {
      return await MessageModel.find({
        $or: [
          { receptor: DTO.receptor, emisor: DTO.emisor },
          { receptor: DTO.emisor, emisor: DTO.receptor },
        ],
      });
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
