import AppError from "../../../errors/AppError";
import ProductsRepository from "../repositories/ProductsRepository";

interface IRequest {
  id: number;
}

export default class DeleteProductsService {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  public async execute({ id }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) throw new AppError('Produto não encontrado!');

    return this.productsRepository.delete(product);
  }
}