import { Request, Response } from "express";
import { CreateCategoryDTO, CustomError, PaginationDTO } from "../../rules";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  private handleError = (errors: unknown, res: Response) => {
    if (errors instanceof CustomError)
      return res.status(errors.code).json(errors.getError);
    return res.status(400).json({ errors });
  };

  create = (req: Request, res: Response) => {
    const { errors, data } = CreateCategoryDTO.create(req.body);
    if (errors) return this.handleError(errors, res);
    this.service
      .createCategory(data!)
      .then((category) => res.json(category))
      .catch((err) => this.handleError(err, res));
  };
  index = (req: Request, res: Response) => {
    const {errors,data}=PaginationDTO.create(req.query);
    if (errors) return this.handleError(errors, res);
    this.service
      .index(data!)
      .then((category) => res.json(category))
      .catch((err) => this.handleError(err, res));
  };
}
