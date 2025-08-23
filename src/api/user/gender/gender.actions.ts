import SmurfResponse, { SmurfAction } from "@core/response";

@SmurfAction({
  action: '/gender',
  message: 'Gender fetched successfully',
})
export class GenderApi extends SmurfResponse {

  async run() {
    this.result = 'index api for Gender';
  }
}