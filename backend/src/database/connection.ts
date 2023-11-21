import 'dotenv/config';

import { DataSource } from 'typeorm';
import User from '../modules/users/entities/User';
import UsersTable1700496180708 from './migrations/1700496180708-UsersTable';
import ProductTable1700501373604 from './migrations/1700501373604-ProductTable';
import Product from '../modules/products/entities/Product';

export const appDataSource = new DataSource({
  type: 'mysql',
  port: Number(process.env.MYSQL_PORT),
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  migrations: [
    UsersTable1700496180708,
    ProductTable1700501373604
  ],
  entities: [User, Product],
});

appDataSource.initialize()
  .then(() => console.log('Database connected!'))
  .catch(err => {
    console.log('[ERR] Error on database connection');
    console.error(err);
  });
