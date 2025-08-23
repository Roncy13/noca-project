import 'module-alias/register';
import dotenv from "dotenv";
import express, { Response, Request } from "express";
import glob from 'glob';
import logger from '@config/logger';
import appUse from '@config/app.use';
import ValidationError from '@core/validation.error';
import PolicyError from '@core/policy.error';
import GuardError from '@core/guard.error';
import IError from '@error-handling/error.interface';
import isEmpty from 'lodash/isEmpty';
import flattenDeep from 'lodash/flattenDeep';
import { StatusCodes } from "http-status-codes";
import { checkSchema, validationResult } from "express-validator";

dotenv.config();

const port = process.env.PORT || 4000;
const app: any = express();
const apiLocations = `${__dirname}/api/**/*.routes{.js,.ts}`;

const startServer = () => {
  app.listen(port, () => {
    logger.info(`server started at http://localhost:${ port }`)
  });
}

const asyncHandler = (fn: typeof Function) => (req: any, res: any, next: any) => {
  return Promise.resolve(fn(req, res, next))
    .catch(next)
}

const setErrorHandler = () => {
  app.use(( req: Request, res: Response, next: typeof Function) => {
    res.status(404).json({
      message: "Requested Url Not Found"
    })
  })

  app.use((err: Error, req: Request, res: Response, next: typeof Function) => {
    const SERVER_ERROR = StatusCodes.INTERNAL_SERVER_ERROR;

    // Error handling is divided into if's with same implementation. If you wish to do customoziation, feel free to edit the code
    if (err instanceof ValidationError) {
      const { message, errors } = err.errorParams;
      const { statusCode, name } = err;

      return res.status(statusCode).json({
        message,
        errors,
        statusCode,
      })
    } else if (err instanceof PolicyError) {
      const { message = '' } = err.errorParams;
      const { statusCode, name } = err;

      return res.status(statusCode).json({
        message,
        statusCode,
        name
      });
    } else if (err instanceof GuardError) {
      const { message, errors = "" } = err.errorParams;
      const { statusCode, name } = err;

      return res.status(statusCode).json({
        message,
        info: errors,
        statusCode,
        name
      });
    }

    logger.error(`Error in Base Code Server: ${err.message}`);

    res.status(SERVER_ERROR).json({
      message: 'Internal Server Error, Please Email SmurfJs for more details...!',
      statusCode: SERVER_ERROR
    })
  })
}

// const setLogger = () => {
//   app.use(expressWinston.logger({
//     transports: [
//       new winston.transports.Console()
//     ],
//     format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.json()
//     ),
//     meta: false, // optional: control whether you want to log the meta data about the request (default to true)
//     msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
//     expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
//     colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
//     ignoreRoute (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
//   }));
// }

// Reads api directory and gets files with action.ts

const ReadDirectories = (file: any) => {
  const component = require(file);
  const classFn = Object.keys(component);
  const readFiles = classFn.map(fn => {
    const fetchComponent = component[fn];
    const apiComponent = new fetchComponent();
    const {
      method,
      action,
      validation,
      policies,
      guards
    } = apiComponent;

    return {
      method,
      action,
      apiComponent: fetchComponent,
      validation,
      policies,
      guards
    };
  });

  return readFiles;
}

// Function for reading the directories
const ReadApi = async (err: any, files: string[]) => {
  if (err) {
    throw new Error('Error in Reading Files');
  }

  const apiRoutes = files.map(ReadDirectories);
  const endpoints = flattenDeep(apiRoutes);

  for (const api of endpoints) {
    const { method, action, apiComponent, validation = null, policies = [], guards = [] } = api as any;
    const setValidation = validation === null ?
      (req: Request, res: Response, next: typeof Function) => next() : checkSchema(validation);
    const validationMiddleware = (req: Request, res: Response, next: any) => {
      const errors = validationResult(req).array();

      if (!isEmpty(errors)) {
        const payload: IError = {
          message: "Error in Validating Request",
          errors
        };
        throw new ValidationError(payload);
      }
      next();
    }

    const guardMiddleware = guards.map((row: typeof Function) => asyncHandler(row));
    const policyMiddleware = policies.map((row: typeof Function) => asyncHandler(row));
    const smurfResponse = async (req: Request, res: Response, next: any) => {
      try {
        const Component = new apiComponent();
        await Component.run(req, res);

        return Component.response(req, res);
      } catch (err) {
        next(err);
      }
    };
    const smurfMiddlewares = [
      ...guardMiddleware,
      setValidation,
      validationMiddleware,
      ...policyMiddleware,
    ];
    app[method](action, ...smurfMiddlewares, smurfResponse);
  }

  setErrorHandler();
  startServer();
}

const setAppUse = async () => {
  // start the express server
  app.use(express.urlencoded({ extended: false }));

  // parse application/json
  app.use(express.json());

  for (const row of appUse) {
    const {
      use,
      name
    } = row;
    try {
      await use(app);
    } catch (err) {
      const errMsg = `Error in ${name} App Use Settings: ${err.message || err.messages}`;
      logger.error(errMsg);
      throw new Error(err);
    }
  }
}

const MainApp = () => {
  setAppUse().then(async () => {
    await glob(apiLocations, ReadApi);
  });
}

MainApp();