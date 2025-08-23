import { Request } from "express";
import IGuard from '@error-handling/iguard.interface';
import { StatusCodes } from 'http-status-codes';
import GuardError from '@core/guard.error';

export default (req: Request, res: Response, next: any) => {
  // tslint:disable-next-line:no-console
  console.log('Implement like Policy Sample in user, difference is it will just be execute first before validation and policies');

  const payload: IGuard = {
    message: 'This Route is not allowed to access',
    errors: [],
    statusCode: StatusCodes.UNAUTHORIZED,
    name: 'Not Allowed'
  }
  const guardErr = new GuardError(payload);

  // add the guardErr in next to execute the guard handling
  return next(guardErr);
  // next();
}
