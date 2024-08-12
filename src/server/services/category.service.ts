import { CategoryModel } from "../../data";
import { CustomError, PaginationDTO } from "../../rules";
import { CreateCategoryDTO } from "../../rules/dtos/category/create.category.dto";

export class CategoryService {
  constructor() {}

  public async createCategory(DTO: CreateCategoryDTO) {
    try {
      return await CategoryModel.create(DTO);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async index(DTO: PaginationDTO) {
    try {
      const [total, data] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((DTO.page - 1) * DTO.limit)
          .limit(DTO.limit),
      ]);
      return {
        total,
        page: DTO.page,
        limit: DTO.limit,
        data: data.map((x) => {
          const { name, _id, available } = x;
          return { name, _id, available };
        }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
