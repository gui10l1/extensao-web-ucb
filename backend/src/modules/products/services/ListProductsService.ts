import Product from "../entities/Product";
import ProductsRepository from "../repositories/ProductsRepository";

export default class ListProductsService {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  public async execute(): Promise<Product[]> {
    return this.productsRepository.list();
  }
}