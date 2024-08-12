import { Request, Response } from "express";
import { CreateProductDTO, CustomError, PaginationDTO } from "../../rules";
import { ProductService } from "../services/product.service";

export class ProductController {
  constructor(private readonly service: ProductService) {}

  private handleError = (errors: unknown, res: Response) => {
    if (errors instanceof CustomError)
      return res.status(errors.code).json(errors.getError);
    return res.status(400).json({ errors });
  };

  create = (req: Request, res: Response) => {
    const { errors, data } = CreateProductDTO.create(req.body);
    if (errors) return this.handleError(errors, res);
    this.service
      .createProduct(data!)
      .then((x) => res.json(x))
      .catch((e) => this.handleError(e, res));
  };

  index = (req: Request, res: Response) => {
    const { errors, data } = PaginationDTO.create(req.query);
    if (errors) return this.handleError(errors, res);
    this.service
      .index(data!)
      .then((x) => res.json(x))
      .catch((e) => this.handleError(e, res));
  };
}
