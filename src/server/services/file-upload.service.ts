import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import { uuid } from "../../plugins";
import { CustomError } from "../../rules";
import { validExt } from "../../config";
import { MediaModel } from "../../data/mongo/models/media.model";
import { UserModel } from "../../data";

export class FileUploadService {
  constructor(private readonly id = uuid) {}

  private checkFolder(path: string) {
    if (!fs.existsSync(path)) fs.mkdirSync(path);
  }

  async uploadSingle(file: UploadedFile, owner: string) {
    const ext = file.mimetype.split("/").at(1) ?? "";

    if (!validExt.includes(ext))
      throw CustomError.badRequest(
        `Invalid extension: ${ext}, valid ones ${validExt}`
      );
    try {
      const des = path.resolve(__dirname, "../../../uploads/users/", owner);
      this.checkFolder(des);
      const fileName = `${this.id()}.${ext}`;
      file.mv(`${des}/${fileName}`);
      const basePhat = "uploads/users/" + owner + "/" + fileName;
      return await MediaModel.create({ owner, Media: basePhat });
    } catch (error) {
      throw CustomError.internalServer("Error al guardar el archivo");
    }
  }

  async uploadMultiple(files: UploadedFile[], owner: string) {
    return await Promise.all(files.map((x) => this.uploadSingle(x, owner)));
  }
  async avatar(file: UploadedFile, _id: string) {
    return await UserModel.findOneAndUpdate({_id},{avatar: (await this.uploadSingle(file,_id))._id },{ new: true }).populate(['avatar','img']);
  }
  async imagen(file: UploadedFile, _id: string) {
    return await UserModel.findOneAndUpdate({_id},{img: (await this.uploadSingle(file,_id))._id },{ new: true }).populate(['avatar','img']);
  }
}
