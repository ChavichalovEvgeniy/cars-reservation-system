import { BookingService } from '../services/bookings.service';
import { Request, Response } from 'express';
import { Status } from '../enums';

export class BookingsController {
  public static async allBookings(req: Request, res: Response) {
    const [err, result] = await BookingService.allBooking();

    if (err) {
      return res.status(err.status).json({ status: Status.ERROR, message: err.message });
    }

    return res.json({
      status: Status.SUCCESS,
      data: result
    });
  }

  public static async bookingById(req: Request, res: Response) {
    const { id } = req.params;

    const [err, result] = await BookingService.bookingById(id);

    if (err) {
      return res.status(err.status).json({ status: Status.ERROR, message: err.message });
    }

    return res.json({
      status: Status.SUCCESS,
      data: result
    });
  }

  public static async createBooking(req: Request, res: Response) {
    const [err, result] = await BookingService.createBooking(req.body);

    if (err) {
      return res.status(err.status).json({ status: Status.ERROR, message: err.message });
    }

    return res.json({
      status: Status.SUCCESS,
      data: result
    });
  }
}
