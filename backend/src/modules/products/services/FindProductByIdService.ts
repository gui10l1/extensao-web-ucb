import AppError from "../../../errors/AppError";
import Product from "../entities/Product";
import ProductsRepository from "../repositories/ProductsRepository";

interface IRequest {
  id: number;
}

export default class FindProductByIdService {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  public async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) throw new AppError('Produto não encontrado!');

    return product;
  }
}