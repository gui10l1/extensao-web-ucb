import { Repository } from "typeorm";
import Product from "../entities/Product";
import { appDataSource } from "../../../database/connection";
import IProductsRepositoryDTO from "../dtos/IProductsRepositoryDTO";

export default class ProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = appDataSource.getRepository(Product);
  }

  public async create(data: IProductsRepositoryDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name: data.name,
      quantity: data.quantity,
      description: data.description,
      price: data.price,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findById(id: number): Promise<Product | undefined> {
    return (await this.ormRepository.findOne({ where: { id } })) || undefined;
  }

  public async list(): Promise<Product[]> {
    return this.ormRepository.find();
  }

  public async update(product: Product, data: Partial<IProductsRepositoryDTO>): Promise<Product> {
    const updatedUser = this.ormRepository.merge(product, data);

    await this.ormRepository.save(updatedUser);

    return updatedUser;
  }

  public async delete(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
}