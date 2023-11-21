import { Router } from "express";
import UsersController from "../controllers/UsersController";

const userRoutes = Router();
const usersController = new UsersController();

userRoutes.get('/', usersController.index);
userRoutes.get('/:id', usersController.find);

userRoutes.post('/', usersController.create);
userRoutes.post('/login', usersController.login);

userRoutes.put('/:id', usersController.update);

export default userRoutes;