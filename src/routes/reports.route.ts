import express from 'express';
import { ReportController } from '../controllers/reports.controller';

const router = express.Router();

router.get('/auto', ReportController.allReports);

router.get('/auto/date', ReportController.reportByDay);

router.get('/auto/:id', ReportController.reportById);

export default router;
