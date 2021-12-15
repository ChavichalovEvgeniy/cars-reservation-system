import { HttpStatus } from '../enums';
import { ReportsRepository } from '../repositories/reports.repository';

export class ReportService {
  public static async allReports() {
    const [err, result] = await ReportsRepository.getAll();

    if (err) {
      err.status = HttpStatus.InternalServerError;
      err.message = 'Internal server error';

      return [err, null];
    }

    return [null, result];
  }

  public static async reportById(id: string) {
    const [err, result] = await ReportsRepository.getById(id);

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

  public static async reportByDay(day: string) {
    const [err, result] = await ReportsRepository.getByDay(day);

    if (err) {
      err.status = HttpStatus.InternalServerError;
      err.message = 'Internal server error';

      return [err, null];
    }

    return [null, result];
  }
}
