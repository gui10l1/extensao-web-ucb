import { Router } from "express";
import userRoutes from "../modules/users/routes/user.routes";
import productRoutes from "../modules/products/routes/product.routes";

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/products', productRoutes);

export default routes;