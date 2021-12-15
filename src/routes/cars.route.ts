import express from 'express';
import { CarsController } from '../controllers/cars.controller';
import { createCarRequestSchema } from '../validators/cars.validator';
import validator from '../middlewares/validator';

const router = express.Router();

router.get('/', CarsController.allCars);

router.get('/:id', CarsController.carById);

router.post('/', validator(createCarRequestSchema), CarsController.createCar);

export default router;
