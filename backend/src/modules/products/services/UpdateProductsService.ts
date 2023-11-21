import AppError from "../../../errors/AppError";
import IProductsRepositoryDTO from "../dtos/IProductsRepositoryDTO";
import Product from "../entities/Product";
import ProductsRepository from "../repositories/ProductsRepository";

interface IRequest {
  id: number;
  data: Partial<IProductsRepositoryDTO>;
}

export default class UpdateProductsService {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  public async execute({ id, data }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) throw new AppError('Produto não encontrado!');

    const updatedProduct = await this.productsRepository.update(product, data);

    return updatedProduct;
  }
}