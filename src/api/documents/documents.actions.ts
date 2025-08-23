import SmurfResponse, { SmurfAction } from "@core/response";
import {
  AskAnyQuestionSrv,
  GenerateBaseQuestionsToAskSrv,
  GenerateDraftSrv,
  GenerateFollowupQuestionSrv,
  GetHistoryOfDocumentContractSrv,
  GenerateSectionContentSrv,
} from "./documents.services";
import {
  DocumentsBasicQuestion,
  DocumentsGenerateClausesContent,
  DocumentsTopics,
} from "./documents.validators";
import { Request } from "express";
import {
  IDocumentDraftClauses,
  IDocumentGenerateContent,
  IDocumentsBasicQuestion,
  IDocumentTopicsToAsk,
} from "./documents.types";
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
  action: "/documents/generateSectionContent",
  message: "Document generated content successfully",
  validation: DocumentsGenerateClausesContent,
  method: HTTP_METHODS.POST,
})
export class generateSectionContentActions extends SmurfResponse {
  async run(request: Request) {
    const body = request.body as IDocumentGenerateContent;
    const ipAddress = request.ip;
    this.result = await GenerateSectionContentSrv(body, ipAddress);
  }
}

@SmurfAction({
  action: "/documents/generateDraft",
  message: "Document draft generated successfully",
  validation: DocumentsTopics,
  method: HTTP_METHODS.POST,
})
export class GenerateDraftAction extends SmurfResponse {
  async run(request: Request) {
    const body = request.body as IDocumentDraftClauses;
    const ipAddress = request.ip;
    this.result = await GenerateDraftSrv(body, ipAddress);
  }
}

@SmurfAction({
  action: "/documents/topics",
  message: "Document topics generated successfully",
  validation: DocumentsTopics,
  method: HTTP_METHODS.POST,
})
export class AskTopicsActions extends SmurfResponse {
  async run(request: Request) {
    const body = request.body as IDocumentTopicsToAsk;
    this.result = await GenerateBaseQuestionsToAskSrv(body);
  }
}

@SmurfAction({
  action: "/documents/askFollowupQuestion",
  message: "Document followup question generated successfully",
  validation: DocumentsBasicQuestion,
  method: HTTP_METHODS.POST,
})
export class AskingBasQuestionsAction extends SmurfResponse {
  async run(request: Request) {
    const body = request.body as IDocumentsBasicQuestion;
    const ipAddress = request.ip;
    this.result = await GenerateFollowupQuestionSrv(body);
  }
}

@SmurfAction({
  action: "/documents/getSession",
  message: "Document followup question generated successfully",
  method: HTTP_METHODS.GET,
})
export class DocumentGetSessionAction extends SmurfResponse {
  async run(request: Request) {
    const ipAddress = request.ip;
    this.result = await GetHistoryOfDocumentContractSrv(ipAddress);
  }
}
