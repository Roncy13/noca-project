import IError from '@error-handling/error.interface';

export default class IPolicy extends IError {
  statusCode?: number;
}