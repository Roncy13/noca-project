import IError from '@error-handling/error.interface';

export default class IGuard extends IError {
  statusCode?: number;
}