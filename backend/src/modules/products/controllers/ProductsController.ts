import { Request, Response } from "express";
import CreateProductsService from "../services/CreateProductsService";
import FindProductByIdService from "../services/FindProductByIdService";
import ListProductsService from "../services/ListProductsService";
import UpdateProductsService from "../services/UpdateProductsService";
import DeleteProductsService from "../services/DeleteProductsService";

export default class ProductsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const service = new ListProductsService();

    const products = await service.execute();

    return res.json(products);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = new FindProductByIdService();

    const product = await service.execute({ id: Number(id) });

    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = new DeleteProductsService();

    await service.execute({ id: Number(id) });

    return res.send();
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const service = new CreateProductsService();

    const product = await service.execute(data);

    return res.status(201).json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const { id } = req.params;

    const service = new UpdateProductsService();

    const product = await service.execute({ id: Number(id), data });

    return res.json(product);
  }
}