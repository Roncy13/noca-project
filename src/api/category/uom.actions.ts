import SmurfResponse, { SmurfAction } from "@core/response";

@SmurfAction({
  action: '/uom',
  message: 'Uom fetched successfully',
})
export class UomApi extends SmurfResponse {

  async run() {
    this.result = 'index api for Uom';
  }
}