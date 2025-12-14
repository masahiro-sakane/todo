import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('バリデーションエラー');
    err.type = 'validation';
    err.details = errors.array().map(e => ({
      field: e.path,
      message: e.msg
    }));
    return next(err);
  }

  next();
};
