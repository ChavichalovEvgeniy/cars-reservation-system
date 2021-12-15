import { Router } from 'express';
import cars from './cars.route';
import bookings from './bookings.route';
import reports from './reports.route';

const routes = Router();

routes.use('/cars', cars);

routes.use('/bookings', bookings);

routes.use('/reports', reports);

export default routes;
