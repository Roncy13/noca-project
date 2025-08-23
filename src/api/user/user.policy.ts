import { Request, Response } from "express";

/**
 * Example Policy Controller for Smurf
 */
export const UserPolicy = async(req: Request, res: Response, next: any) => {

  // Provide throw for your policy error
  res.locals = {
    test: 'dsadsad'
  }
  next();
}