import { Validators } from "../../../config";

type Obj={[key:string]:any};


export class CreateProductDTO {
  constructor(
    public readonly name:string,
    public readonly available:boolean,
    public readonly price:number,
    public readonly description:string,
    public readonly user:string,
    public readonly category:string,
  ) {}

  static create(obj:Obj):{errors?:Obj,data?:CreateProductDTO}{
    const {name,available=false,price,description='',user,category_id}=obj;
    const errors:Obj={};
    if(!name)errors.name='Missing name';
    if(!price)errors.price='Missing price';
    else if(+price<=0)errors.price='Invalid price';
    if(!description)errors.description='Missing description';
    if(!category_id)errors.category='Missing category';
    else if(!Validators.isMongoID(category_id))errors.category='Invalid category id';
    else if(!Validators.isMongoID(user.id))errors.category='Invalid user id';
    if(Object.keys(errors).length>0)return {errors}
    return {data:new CreateProductDTO(name,!!available,price,description,user.id,category_id)};
  }
}
