import { Request, Response } from "express";
import PolicyError from '@core/policy.error';

/**
 * Example Policy Controller for Smurf
 */
export const CategoryPolicy = async(req: Request, res: Response, next: any) => {

  // Provide throw for your policy error
  throw new PolicyError({
    name: 'CategoryPolicy'
  });
  next();
}