import SmurfResponse, { SmurfAction } from "@core/response";
import { HTTP_METHODS } from "@utilities/constants";
import { Request } from 'express';
import { GetUserAll } from "./user.services";
import { Response } from 'express';

@SmurfAction({
  action: '/user',
  message: 'User fetched successfully',
})
export class UserApi extends SmurfResponse {

  async run() {
    this.result = await GetUserAll();
  }
}

@SmurfAction({
  action: '/user',
  message: 'User fetched successfully',
  method: HTTP_METHODS.POST
})
export class CreateUserApi extends SmurfResponse {

  async run({ body, query }: Request) {
    this.result = {
      body, query
    };
  }
}

@SmurfAction({
  action: '/user/:id',
  message: 'User fetched successfully',
  method: HTTP_METHODS.PATCH
})
export class PatchUserApi extends SmurfResponse {

  async run({ body, query, params }: Request, { locals }: Response) {
    this.result = {
      body, query, params
    };
  }
}