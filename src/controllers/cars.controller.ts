import { Request, Response } from 'express';
import { Status } from '../enums';
import { CarsService } from '../services/cars.service';

export class CarsController {
  public static async allCars(req: Request, res: Response) {
    const [err, result] = await CarsService.allCars();

    if (err) {
      return res.status(err.status).json({ status: Status.ERROR, message: err.message });
    }

    return res.json({
      status: Status.SUCCESS,
      data: result
    });
  }

  public static async carById(req: Request, res: Response) {
    const { id } = req.params;

    const [err, result] = await CarsService.carById(id);

    if (err) {
      return res.status(err.status).json({ status: Status.ERROR, message: err.message });
    }

    return res.json({
      status: Status.SUCCESS,
      data: result
    });
  }

  public static async createCar(req: Request, res: Response) {
    const [err, result] = await CarsService.createCar(req.body);

    if (err) {
      return res.status(err.status).json({ status: Status.ERROR, message: err.message });
    }

    return res.json({
      status: Status.SUCCESS
    });
  }
}
