import { Router } from 'express';

import ProductsController from '../controllers/products-controller';
import UsersController from '../controllers/users-controller';

const router = Router();

const products = new ProductsController();
const users = new UsersController();

// User sign up/sign in endpoints
router.get('/users', users.getAll);
router.post('/users', users.create);

// Product management endpoints
router.get('/products', products.getAll);
router.post('/products', products.create);

export default router;
