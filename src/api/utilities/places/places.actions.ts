import SmurfResponse, { SmurfAction } from "@core/response";

@SmurfAction({
  action: '/places',
  message: 'Places fetched successfully',
})
export class PlacesApi extends SmurfResponse {

  async run() {
    this.result = 'index api for Places';
  }
}