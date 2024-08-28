import fs from "fs";
import path from "path";
import { CustomError } from "../../rules";
import { validExt } from "../../config";
import { MediaModel } from "../../data/mongo/models/media.model";

export class ImageService {
  constructor() {}

  async getImage(owner: string) {
    
    return await MediaModel.find({ owner });
    // const ext = name.split(".").at(1) ?? "";

    // if (!validExt.includes(ext))
    //   throw CustomError.badRequest(
    //     `Invalid extension: ${ext}, valid ones ${validExt}`
    //   );
    // const des = path.resolve(
    //   __dirname,
    //   "../../../uploads/",
    //   `${folder}/${name}`
    // );
    // if (!fs.existsSync(des))
    //   throw CustomError.badRequest(`File: ${name}, not exist`);
    // return des;
  }
}
