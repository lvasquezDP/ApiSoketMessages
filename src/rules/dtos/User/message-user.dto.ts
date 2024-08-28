import { UploadedFile } from "express-fileupload";

type Obj={[key:string]:any};

export class messageUserDTO {
  constructor(
    public readonly message:string,
    public readonly files: UploadedFile[],
    public readonly emisor:string,
    public readonly receptor:string,
  ) {}

  static create(obj:Obj):{errors?:Obj,data?:messageUserDTO}{
    const {message,emisor,receptor,files=[]}=obj;
    const errors:Obj={};
    if(!emisor)errors.emisor='Missing emisor';
    if(!receptor)errors.receptor='Missing receptor';
    if(files.length==0&&!message)errors.message='Missing message';
    if(Object.keys(errors).length>0)return {errors}
    return {data:new messageUserDTO(message,files,emisor,receptor)};
  }
}
