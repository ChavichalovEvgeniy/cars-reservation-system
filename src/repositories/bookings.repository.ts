import client from '../db/connect/connect';
import { v4 as uuid } from 'uuid';

export class BookingRepository {
  public static async getAll() {
    try {
      const result = await client.query('SELECT * from bookings');

      return [null, result.rows];
    } catch (err) {
      return [err, null];
    }
  }

  public static async getById(id: string) {
    try {
      const result = await client.query('SELECT * FROM bookings WHERE id = $1', [id]);

      return [null, result.rows];
    } catch (err) {
      return [err, null];
    }
  }

  public static async getInfoForCreateBooking(tariffId: string, rentalDays: number) {
    try {
      const allInfoForCreateBooking = await client.query(
        `SELECT cars.id, json_agg(json_build_object('start',bookings.start_day, 'end', bookings.end_day)) as orders, bit_and(tariffs.amount) as amount, bit_and(discounts.percent) as percent
             FROM cars
             LEFT JOIN bookings ON bookings.car_id = cars.id
             LEFT JOIN tariffs ON tariffs.id = $1
      	     LEFT JOIN discounts ON discounts.min <= $2 AND discounts.max >= $2
             GROUP BY cars.id`,
        [tariffId, rentalDays]
      );

      return [null, allInfoForCreateBooking.rows];
    } catch (err) {
      return [err, null];
    }
  }

  public static async create(start: string, end: string, id: string) {
    try {
      const result = await client.query(
        'INSERT INTO bookings(id,start_day,end_day,car_id,"created_at","updated_at") VALUES($1, $2, $3, $4, $5, $6)',
        [uuid(), start, end, id, new Date(), new Date()]
      );

      return [null, result];
    } catch (err) {
      return [err, null];
    }
  }
}
