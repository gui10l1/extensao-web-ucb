import AppError from "../../../errors/AppError";
import User from "../entities/User";
import UsersRepository from "../repositories/UsersRepository";

interface IRequest {
  email: string;
  password: string;
}

export default class CreateSessionsService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  public async execute({ email, password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Email ou senha estão errados!');

    const { password: userPassword } = user;

    if (userPassword !== password) throw new AppError('Email ou senha estão errados!');

    return user;
  }
}