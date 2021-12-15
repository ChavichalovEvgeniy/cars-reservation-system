import { BookingRepository } from '../repositories/bookings.repository';
import momentFunc, * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { HttpStatus } from '../enums';

export class BookingService {
  public static async allBooking() {
    const [err, result] = await BookingRepository.getAll();

    if (err) {
      err.status = HttpStatus.InternalServerError;
      err.message = 'Internal server error';

      return [err, null];
    }

    return [null, result];
  }

  public static async bookingById(id: string) {
    const [err, result] = await BookingRepository.getById(id);

    if (err) {
      err.status = HttpStatus.InternalServerError;
      err.message = 'Internal server error';

      return [err, null];
    } else if (!result.length) {
      const err = {
        status: HttpStatus.NotFound,
        message: 'no booking with this id'
      };

      return [err, null];
    }

    return [null, result];
  }

  public static async createBooking(body: { start: string; end: string; tariffId: string }) {
    const { start, end, tariffId } = body;

    const startDate = momentFunc(start, 'YYYY-MM-DD');
    const endData = momentFunc(end, 'YYYY-MM-DD');
    const rentalDays = endData.diff(startDate, 'days') + 1;

    if (
      rentalDays < 0 ||
      rentalDays > 30 ||
      momentFunc(start).isoWeekday() === 6 ||
      momentFunc(start).isoWeekday() === 7 ||
      momentFunc(end).isoWeekday() === 6 ||
      momentFunc(end).isoWeekday() === 7
    ) {
      const err = {
        status: HttpStatus.Conflict,
        message: 'incorrect date entered'
      };

      return [err, null];
    }

    const [error, allInfoForBooking] = await BookingRepository.getInfoForCreateBooking(tariffId, rentalDays);

    if (error) {
      error.status = HttpStatus.InternalServerError;
      error.message = 'Internal server error';

      return [error, null];
    } else if (!allInfoForBooking[0].amount) {
      const err = {
        status: HttpStatus.NotFound
      };

      return [err, null];
    }

    if (!allInfoForBooking[0].percent) {
      allInfoForBooking[0].percent = 0;
    }

    const freeCars = this._findFreeCars({ start, end }, allInfoForBooking);

    if (!freeCars.length) {
      const err = {
        status: HttpStatus.NotFound,
        message: 'no cars available'
      };

      return [err, null];
    }

    const [createBookingError, createBooking] = await BookingRepository.create(start, end, freeCars[0].id);

    if (createBookingError) {
      createBookingError.status = HttpStatus.InternalServerError;
      createBookingError.message = 'Internal server error';
      return [createBookingError, null];
    }

    const finalPrice = rentalDays * allInfoForBooking[0].amount * ((100 - allInfoForBooking[0].percent) / 100);

    return [null, { finalPrice, start, end, carId: freeCars[0].id }];
  }

  private static _findFreeCars = (interval: { start: string; end: string }, cars: any) => {
    const moment = extendMoment(Moment);

    const add3Days = (date: Date) => {
      return new Date(date.setDate(date.getDate() + 3));
    };

    const availabilityCars = cars.map((car: any) => ({
      id: car.id,
      orders: car.orders.map((order: { start: string; end: string }) => ({
        ...order,
        start: new Date(order.start),
        end: add3Days(new Date(order.end))
      }))
    }));

    const newOrderRange = moment.range(new Date(interval.start), new Date(interval.end));

    const freeCars = availabilityCars.filter((car: any) => {
      const overlaps = car.orders.filter((order: any) => {
        const range = moment.range(order.start, order.end);
        return newOrderRange.overlaps(range, { adjacent: true });
      });
      return !overlaps.length;
    });

    return freeCars;
  };
}
