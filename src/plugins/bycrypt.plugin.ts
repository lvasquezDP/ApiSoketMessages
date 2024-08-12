import crypt from "bcryptjs";

export const bcrypt={
    hash:(pass:string)=>crypt.hashSync(pass,crypt.genSaltSync()),
    compare:(pass:string,hash:string)=>crypt.compareSync(pass,hash),
}
