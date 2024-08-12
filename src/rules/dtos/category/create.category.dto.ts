type Obj={[key:string]:any};


export class CreateCategoryDTO {
  constructor(
    public readonly name:string,
    public readonly available:boolean,
    public readonly user:string,
  ) {}

  static create(obj:Obj):{errors?:Obj,data?:CreateCategoryDTO}{
    const {name,available=false,user}=obj;
    let availableBoolean=typeof available=='boolean'?available:available==='true';
    const errors:Obj={};
    if(!name)errors.name='Missing name';
    if(Object.keys(errors).length>0)return {errors}
    return {data:new CreateCategoryDTO(name,availableBoolean,user.id)};
  }
}
