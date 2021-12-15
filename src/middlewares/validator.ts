import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import { ParamTypes, HttpStatus, Status } from '../enums';

const validator =
  (schema: Schema, property = ParamTypes.Body) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;

    if (valid) {
      return next();
    }

    const { details } = error;
    const message = details.map((i: any) => i.message).join(',');
    console.log(error);
    res.status(HttpStatus.NotAcceptable).json({ status: Status.ERROR, message: 'Incorrect data entered' });
  };

export default validator;
