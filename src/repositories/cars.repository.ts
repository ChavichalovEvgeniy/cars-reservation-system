import client from '../db/connect/connect';
import { v4 as uuid } from 'uuid';

export class CarsRepository {
  public static async getAll() {
    try {
      const result = await client.query('SELECT * from cars');

      return [null, result.rows];
    } catch (err) {
      return [err, null];
    }
  }

  public static async getById(id: string) {
    try {
      const result = await client.query('SELECT * FROM cars WHERE id = $1', [id]);

      return [null, result.rows];
    } catch (err) {
      return [err, null];
    }
  }

  public static async create(body: { model: string; brand: string; plate: string; vin: string }) {
    const { model, brand, plate, vin } = body;

    try {
      const result = await client.query(
        'INSERT INTO cars(id,model,brand,plate,vin,"created_at","updated_at") VALUES($1, $2, $3, $4, $5, $6, $7)',
        [uuid(), model, brand, plate, vin, new Date(), new Date()]
      );

      return [null, result];
    } catch (err) {
      return [err, null];
    }
  }
}
