import { regularExps } from "../../../config";

type Obj={[key:string]:any};


export class RegisterUserDTO {
  constructor(
    public readonly name:string,
    public readonly email:string,
    public readonly password:string,
  ) {}

  static create(obj:Obj):{errors?:Obj,data?:RegisterUserDTO}{
    const {name,email,password}=obj;
    const errors:Obj={};
    if(!name)errors.name='Missing name';
    if(!email)errors.email='Missing email';
    else if(!regularExps.email.test(email))errors.regularExps='Email is not valid';
    if(!password)errors.password='Missing password';
    else if(password.length<6)errors.password='Password too short';
    if(Object.keys(errors).length>0)return {errors}
    return {data:new RegisterUserDTO(name,email,password)};
  }
}
