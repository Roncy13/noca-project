import IError from '@error-handling/error.interface';
import { StatusCodes } from 'http-status-codes';

export default class ValidationError extends Error {
  errorParams: IError;
  statusCode: number = StatusCodes.UNPROCESSABLE_ENTITY;

  constructor (params: IError) {
    super(params.message)

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name
    this.errorParams = params;
  }
}