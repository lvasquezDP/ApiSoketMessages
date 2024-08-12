type Obj={[key:string]:any};


export class PaginationDTO {
  constructor(
    public readonly page:number,
    public readonly limit:number
  ) {}

  static create(obj:Obj):{errors?:Obj,data?:PaginationDTO}{
    const {page=1,limit=1}=obj;
    const errors:Obj={};
    if(+page<=0)errors.name='Page must be greater than 0';
    if(+limit<=0)errors.name='limit must be greater than 0';
    if(Object.keys(errors).length>0)return {errors}
    return {data:new PaginationDTO(+page,+limit)};
  }
}
