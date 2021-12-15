import { HttpStatus } from '../enums';
import { CarsRepository } from '../repositories/cars.repository';

export class CarsService {
  public static async allCars() {
    const [err, result] = await CarsRepository.getAll();

    if (err) {
      err.status = HttpStatus.InternalServerError;
      err.message = 'Internal server error';

      return [err, null];
    }

    return [null, result];
  }

  public static async carById(id: string) {
    const [err, result] = await CarsRepository.getById(id);

    if (err) {
      err.status = HttpStatus.InternalServerError;
      err.message = 'Internal server error';

      return [err, null];
    } else if (!result.length) {
      const err = {
        status: HttpStatus.NotFound,
        message: 'no car with this id'
      };

      return [err, null];
    }

    return [null, result];
  }

  public static async createCar(body: { model: string; brand: string; plate: string; vin: string }) {
    const [err, result] = await CarsRepository.create(body);

    if (err) {
      err.status = HttpStatus.InternalServerError;
      err.message = 'Internal server error';

      return [err, null];
    }

    return [null, result];
  }
}
