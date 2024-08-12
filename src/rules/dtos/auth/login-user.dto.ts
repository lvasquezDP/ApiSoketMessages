import { regularExps } from "../../../config";

type Obj={[key:string]:any};


export class loginUserDTO {
  constructor(
    public readonly email:string,
    public readonly password:string,
  ) {}

  static create(obj:Obj):{errors?:Obj,data?:loginUserDTO}{
    const {email,password}=obj;
    const errors:Obj={};
    if(!email)errors.email='Missing email';
    else if(!regularExps.email.test(email))errors.regularExps='Email is not valid';
    if(!password)errors.password='Missing password';
    else if(password.length<6)errors.password='Password too short';
    if(Object.keys(errors).length>0)return {errors}
    return {data:new loginUserDTO(email,password)};
  }
}
