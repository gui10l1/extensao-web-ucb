import { Repository } from "typeorm";
import User from "../entities/User";
import { appDataSource } from "../../../database/connection";
import IUsersRepositoryDTO from "../dtos/IUsersRepositoryDTO";

export default class UsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = appDataSource.getRepository(User);
  }

  public async create(data: IUsersRepositoryDTO): Promise<User> {
    const user = this.ormRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findById(id: number): Promise<User | undefined> {
    return (await this.ormRepository.findOne({ where: { id } })) || undefined;
  }

  public async list(): Promise<User[]> {
    return this.ormRepository.find();
  }

  public async update(user: User, data: Partial<IUsersRepositoryDTO>): Promise<User> {
    const updatedUser = this.ormRepository.merge(user, data);

    await this.ormRepository.save(updatedUser);

    return updatedUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return (await this.ormRepository.findOne({ where: { email } })) || undefined;
  }
}