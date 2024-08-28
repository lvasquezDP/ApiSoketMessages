import { UploadedFile } from "express-fileupload";
import { CategoryModel, UserModel } from "../../data";
import { MessageModel } from "../../data/mongo/models/messages.model";
import { CustomError } from "../../rules";
import { messageUserDTO } from "../../rules/dtos/User/message-user.dto";
import { messagesUserDTO } from "../../rules/dtos/User/messages-user.dto";
import { WssService } from "./wss.service";
import path from "path";
import { FileUploadService } from "./file-upload.service";

export class UserService {
  constructor() {}

  public async sendMessage(DTO: messageUserDTO) {
    try {
      const files =(await new FileUploadService().uploadMultiple(DTO.files,DTO.emisor)).map(x=>x._id);
      const message = await MessageModel.findById((await MessageModel.create({...DTO,img:files}))._id).populate('img');
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
      }).populate('img')
      .sort({ created_at: -1 });
      return messages;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
