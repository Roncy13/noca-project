import SmurfResponse, { SmurfAction } from "@core/response";

@SmurfAction({
  action: '/sample',
  message: 'Sample fetched successfully',
})
export class SampleApi extends SmurfResponse {

  async run() {
    this.result = 'index api for Sample';
  }
}