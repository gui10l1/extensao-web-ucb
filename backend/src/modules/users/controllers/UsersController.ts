import { Request, Response } from "express";
import ListUsersService from "../services/ListUsersService";
import FindUserByIdService from "../services/FindUserByIdService";
import CreateUsersService from "../services/CreateUsersService";
import UpdateUsersService from "../services/UpdateUsersService";
import CreateSessionsService from "../services/CreateSessionsService";

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const service = new ListUsersService();

    const users = await service.execute();

    return res.json(users);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = new FindUserByIdService();

    const user = await service.execute({ id: Number(id) });

    return res.json(user);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const service = new CreateUsersService();

    const user = await service.execute(data);

    return res.status(201).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const { id } = req.params;

    const service = new UpdateUsersService();

    const user = await service.execute({ id: Number(id), data });

    return res.json(user);
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const service = new CreateSessionsService();

    const user = await service.execute({ email, password });

    return res.json(user);
  }
}