import IError from '@error-handling/error.interface';
import IPolicy from '@error-handling/ipolicy.interface';
import { StatusCodes } from 'http-status-codes';

export default class PolicyError extends Error {
  errorParams: IError;
  statusCode: number = StatusCodes.CONFLICT;

  constructor (params: IPolicy) {
    super(params.message || '')

    // assign the error class name in your custom error (as a shortcut)
    this.errorParams = params;
    this.name = params.name;
    this.statusCode = params.statusCode || StatusCodes.CONFLICT
  }
}
