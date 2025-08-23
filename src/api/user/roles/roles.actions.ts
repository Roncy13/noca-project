import SmurfResponse, { SmurfAction } from "@core/response";

@SmurfAction({
  action: '/roles',
  message: 'Roles fetched successfully',
})
export class RolesApi extends SmurfResponse {

  async run() {
    this.result = 'index api for Roles';
  }
}

@SmurfAction({
  action: '/roles/test',
  message: 'Roles fetched successfully',
})
export class RolesTestApi extends SmurfResponse {

  async run() {
    this.result = 'index api test for Roles';
  }
}