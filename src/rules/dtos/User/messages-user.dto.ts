type Obj={[key:string]:any};

export class messagesUserDTO {
  constructor(
    public readonly emisor:string,
    public readonly receptor:string,
  ) {}

  static create(obj:Obj):{errors?:Obj,data?:messagesUserDTO}{
    const {emisor,receptor}=obj;
    const errors:Obj={};
    if(!emisor)errors.emisor='Missing emisor';
    if(!receptor)errors.receptor='Missing receptor';
    if(Object.keys(errors).length>0)return {errors}
    return {data:new messagesUserDTO(emisor,receptor)};
  }
}
