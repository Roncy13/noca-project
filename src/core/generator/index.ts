import { NodePlopAPI } from 'plop';3
import { GenerateAction } from './../custom/actions/index';
import { GenerateService } from './../custom/services';
import { SetYourComponent } from './utils/globals';
import { GenerateModel } from './../custom/models';
import { GenerateValidator } from './../custom/validator';
import { GenerateApi } from './../custom/api';
import { GenerateRoute } from './../custom/route';
import { GenerateGuard, GeneratePolicy } from './../custom/middlewares';
import * as helpers from './helpers';
import * as service from './service';
import * as action from './action';
import * as model from './model';
import * as validator from './validator';
import * as route from './route';
import * as middlewares from './middlewares';
import * as api from './api';

export default async function (plop: NodePlopAPI | any) {
  async function SetPlops(values: Object[], plopType: string) {
    await values.forEach(async (r) => {
      const func = r as any;
      const keys = Object.keys(r).filter(f => f !== 'default');

      await Promise.all(keys.map(index => {
        plop[`${plopType}`](index, func[index]);
      }));
    });
  }

  plop.setGenerator('Api', GenerateApi);
  plop.setGenerator('Action', GenerateAction);
  plop.setGenerator('Route', GenerateRoute);
  plop.setGenerator('Service', GenerateService);
  plop.setGenerator('Model', GenerateModel);
  plop.setGenerator('Validator', GenerateValidator);
  plop.setGenerator('Policy', GeneratePolicy);
  plop.setGenerator('Guard', GenerateGuard);

  plop.setActionType('setComponent', SetYourComponent);

  await SetPlops([action], 'setActionType');
  await SetPlops([helpers, api, route, service, model, validator, middlewares], 'setHelper');
};