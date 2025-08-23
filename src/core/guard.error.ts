import IError from '@error-handling/error.interface';
import IPolicy from '@error-handling/ipolicy.interface';
import { StatusCodes } from 'http-status-codes';

export default class GuardError extends Error {
  errorParams: IError;
  statusCode: number = StatusCodes.FORBIDDEN;

  constructor (params: IPolicy) {
    super(params.message)
    // assign the error class name in your custom error (as a shortcut)
    this.errorParams = params;
    this.name = params.name || "Guarded Route";
    this.statusCode = params.statusCode || StatusCodes.FORBIDDEN
  }
}
