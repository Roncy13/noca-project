import SmurfResponse, { SmurfAction } from "@core/response";
import {
  AskAnyQuestionSrv,
  GenerateFollowupQuestionSrv,
} from "./documents.services";
import { DocumentsBasicQuestion } from "./documents.validators";
import { Request } from "express";
import { IDocumentsBasicQuestion } from "./documents.types";
import { HTTP_METHODS } from "@utilities/constants";

@SmurfAction({
  action: "/documents",
  message: "Documents fetched successfully",
})
export class DocumentsApi extends SmurfResponse {
  async run() {
    this.result = await AskAnyQuestionSrv();
  }
}

@SmurfAction({
  action: "/documents/followupQuestions",
  message: "Document followup question generated successfully",
  validation: DocumentsBasicQuestion,
  method: HTTP_METHODS.POST,
})
export class AskingBasQuestions extends SmurfResponse {
  async run(request: Request) {
    const body = request.body as IDocumentsBasicQuestion;
    this.result = await GenerateFollowupQuestionSrv(body);
  }
}
