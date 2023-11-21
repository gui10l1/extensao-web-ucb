import AppError from "../../../errors/AppError";
import IProductsRepositoryDTO from "../dtos/IProductsRepositoryDTO";
import Product from "../entities/Product";
import ProductsRepository from "../repositories/ProductsRepository";

export default class CreateProductsService {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  public async execute(data: IProductsRepositoryDTO): Promise<Product> {
    return this.productsRepository.create(data);
  }
}