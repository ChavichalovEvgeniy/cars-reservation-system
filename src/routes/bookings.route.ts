import express from 'express';
import { BookingsController } from '../controllers/bookings.controller';
import { createBookingRequestSchema } from '../validators/bookings.validator';
import validator from '../middlewares/validator';

const router = express.Router();

router.get('/', BookingsController.allBookings);

router.get('/:id', BookingsController.bookingById);

router.post('/', validator(createBookingRequestSchema), BookingsController.createBooking);

export default router;
