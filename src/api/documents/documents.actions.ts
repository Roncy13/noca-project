import SmurfResponse, { SmurfAction } from "@core/response";
import { AskAnyQuestionSrv } from "./documents.services";

@SmurfAction({
  action: "/documents",
  message: "Documents fetched successfully",
})
export class DocumentsApi extends SmurfResponse {
  async run() {
    this.result = await AskAnyQuestionSrv();
  }
}
