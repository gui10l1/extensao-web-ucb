import AppError from "../../../errors/AppError";
import IUsersRepositoryDTO from "../dtos/IUsersRepositoryDTO";
import User from "../entities/User";
import UsersRepository from "../repositories/UsersRepository";

export default class CreateUsersService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  public async execute(data: IUsersRepositoryDTO): Promise<User> {
    const userByEmail = await this.usersRepository.findByEmail(data.email);

    if (userByEmail) {
      throw new AppError('Este email já está em uso!');
    }

    return this.usersRepository.create(data);
  }
}