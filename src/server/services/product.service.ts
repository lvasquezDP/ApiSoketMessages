import { ProductModel } from "../../data";
import { CreateProductDTO, CustomError, PaginationDTO } from "../../rules";

export class ProductService {
  constructor() {}

  public async createProduct(DTO: CreateProductDTO) {
    if (await ProductModel.findOne({ name: DTO.name }))
      throw CustomError.badRequest("Product already exists");
    try {
      return await ProductModel.create(DTO);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async index(DTO: PaginationDTO) {
    try {
      const [total, data] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((DTO.page - 1) * DTO.limit)
          .limit(DTO.limit)
          .populate('user')
          .populate('category'),
      ]);
      return {
        total,
        page: DTO.page,
        limit: DTO.limit,
        data: data,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
