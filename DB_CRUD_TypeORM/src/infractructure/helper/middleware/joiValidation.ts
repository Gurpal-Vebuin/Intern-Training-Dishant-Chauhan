import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validationDetails =
  (schema: Joi.Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate({ ...req.body, ...req.params });
    if (error) {
      res.status(400).send({
        msg: error.details[0].message,
        success: false,
      });
    }
    next();
  };
