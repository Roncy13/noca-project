import { Request } from "express";
import IGuard from '@error-handling/iguard.interface';
import { StatusCodes } from 'http-status-codes';
import GuardError from '@core/guard.error';
import { verify } from 'jsonwebtoken'

const checkEncodedToken = (token: string) => {
  const arrayToken = token.split('.')
  if (arrayToken.length !== 3) {
    return false
  }

  const decoded = verify(token, process.env.SECRET_KEY);

  return decoded
}

const checkToken = (authorization: string) => {
  const token = authorization.split(' ')
  const headerPrefix = token[0]
  const accessToken = token[1]
  if (headerPrefix !== 'JWT') {
    return false
  }

  const decodedToken = checkEncodedToken(accessToken)
  if (!decodedToken) {
    return false
  }

  return decodedToken
}

export default  (req: Request, res: Response, next: any) => {
  // tslint:disable-next-line:no-console
  console.log('Implement like Policy Sample in user, difference is it will just be execute first before validation and policies');

  const payload: IGuard = {
    message: 'This Route is not allowed to access',
    errors: [],
    statusCode: StatusCodes.UNAUTHORIZED,
    name: 'Not Allowed'
  }

  const guardErr = new GuardError(payload);

  const { authorization } = req.headers
  const verifyToken: any = checkToken(authorization)
  if (!verifyToken) {
    next(guardErr);
  }

  // add the guardErr in next to execute the guard handling
  next();
}
