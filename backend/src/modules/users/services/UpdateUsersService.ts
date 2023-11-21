import AppError from "../../../errors/AppError";
import IUsersRepositoryDTO from "../dtos/IUsersRepositoryDTO";
import User from "../entities/User";
import UsersRepository from "../repositories/UsersRepository";

interface IRequest {
  id: number;
  data: Partial<IUsersRepositoryDTO>;
}

export default class UpdateUsersService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  public async execute({ id, data }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('Usuário não encontrado!');

    if (data.email && data.email !== user.email) {
      const findUserByEmail = await this.usersRepository.findByEmail(data.email);

      if (findUserByEmail) throw new AppError('Já tem alguém usando o email informado!');
    }

    const updatedUser = await this.usersRepository.update(user, data);

    return updatedUser;
  }
}