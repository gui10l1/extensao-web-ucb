import AppError from "../../../errors/AppError";
import User from "../entities/User";
import UsersRepository from "../repositories/UsersRepository";

interface IRequest {
  id: number;
}

export default class FindUserByIdService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('Usuário não encontrado!');

    return user;
  }
}