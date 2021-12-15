import { ReportService } from '../services/reports.service';
import { Request, Response } from 'express';
import { Status } from '../enums';

export class ReportController {
  public static async allReports(req: Request, res: Response) {
    const [err, result] = await ReportService.allReports();

    if (err) {
      return res.status(err.status).json({ status: Status.ERROR, message: err.message });
    }

    return res.json({
      status: Status.SUCCESS,
      data: result
    });
  }

  public static async reportById(req: Request, res: Response) {
    const { id } = req.params;

    const [err, result] = await ReportService.reportById(id);

    if (err) {
      return res.status(err.status).json({ status: Status.ERROR, message: err.message });
    }

    return res.json({
      status: Status.SUCCESS,
      data: result
    });
  }

  public static async reportByDay(req: Request, res: Response) {
    const { day }: { day?: string } = req.query;

    const [err, result] = await ReportService.reportByDay(day);

    if (err) {
      return res.status(err.status).json({ status: Status.ERROR, message: err.message });
    }

    return res.json({
      status: Status.SUCCESS,
      data: result
    });
  }
}
