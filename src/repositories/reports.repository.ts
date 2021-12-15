import client from '../db/connect/connect';

export class ReportsRepository {
  public static async getAll() {
    try {
      const infoAboutAllCars = await client.query(
        `SELECT cars.id, json_agg(json_build_object('orderId',bookings.id,'start',bookings.start_day, 'end', bookings.end_day)) as orders
             FROM cars
             LEFT JOIN bookings ON bookings.car_id = cars.id
             GROUP BY cars.id`
      );

      return [null, infoAboutAllCars.rows];
    } catch (err) {
      return [err, null];
    }
  }

  public static async getById(id: string) {
    try {
      const infoAboutCar = await client.query(
        `SELECT cars.id, json_agg(json_build_object('orderId',bookings.id,'start',bookings.start_day, 'end', bookings.end_day)) as orders
             FROM cars
             LEFT JOIN bookings ON bookings.car_id =  cars.id
             WHERE cars.id = $1
             GROUP BY cars.id`,
        [id]
      );

      return [null, infoAboutCar.rows];
    } catch (err) {
      return [err, null];
    }
  }

  public static async getByDay(day: string) {
    const carsId: string[] = [];
    try {
      const infoAboutCar = await client.query(
        `  SELECT cars.id, json_agg(json_build_object('start',bookings.start_day, 'end', bookings.end_day)) as orders
             FROM cars
             LEFT JOIN bookings ON bookings.car_id =  cars.id
             WHERE bookings.start_day <= $1 AND bookings.end_day >= $1
             GROUP BY cars.id`,
        [day]
      );
      infoAboutCar.rows.forEach((item: { id: string }) => {
        carsId.push(item.id);
      });

      return [null, carsId];
    } catch (err) {
      return [err, null];
    }
  }
}
