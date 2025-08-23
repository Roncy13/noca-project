import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HTTP_METHODS } from "@utilities/constants";
import { CheckEmpty } from "@utilities/dataHelper";
import { Schema } from "express-validator";

class ISmurfOptions {
  action: string = "/";
  method?: HTTP_METHODS = HTTP_METHODS.GET;
  status?: StatusCodes = StatusCodes.OK;
  guards?: any[] = [];
  message?: string = "";
  policies?: any[] = [];
  validation?: Schema = null;
}

export default abstract class PdfResponse extends ISmurfOptions {
  public result: any = {};

  constructor(args: any) {
    super();

    this.assignDefaultProperties();
    this.setProperties(args);
  }

  private assignDefaultProperties() {
    this.message = "";
    this.action = "/";
    this.status = StatusCodes.OK;
    this.method = HTTP_METHODS.GET;
    this.result = {};
    this.policies = [];
    this.guards = [];
    this.validation = null;
  }

  private setProperties(args: {} = {}): void {
    const keys = Object.keys(args);

    keys.forEach((r) => {
      if (r in this) {
        (this as any)[r] = (args as any)[r];
      }
    });
  }

  abstract run(request: Request, response: Response): Promise<void>;

  public response(req: Request, resp: Response) {
    if (CheckEmpty(resp) || CheckEmpty(req)) {
      throw new Error("Response and Request are not set");
    }
  }
}

export function SmurfAction(options: ISmurfOptions) {
  return function _DecoratorName<T extends new (...args: any[]) => {}>(
    constr: T
  ) {
    return class extends constr {
      constructor(...args: any[]) {
        super({ ...args, ...options });
      }
    };
  };
}
