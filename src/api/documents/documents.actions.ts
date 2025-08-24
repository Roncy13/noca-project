import PdfResponse from "@core/pdfResponse";
import SmurfResponse, { SmurfAction } from "@core/response";
import htmlToPdf from "html-pdf-node";

import { HTTP_METHODS } from "@utilities/constants";
import { Request } from "express";
import { renderClauseHTML } from "./document.utils";
import {
  AskAnyQuestionSrv,
  GenerateBaseQuestionsToAskSrv,
  GenerateDraftSrv,
  GenerateFollowupQuestionSrv,
  GenerateSectionContentSrv,
  GetHistoryOfDocumentContractSrv,
} from "./documents.services";
import {
  IDocumentDraftClauses,
  IDocumentGenerateContent,
  IDocumentsBasicQuestion,
  IDocumentTopicsToAsk,
} from "./documents.types";
import {
  DocumentsBasicQuestion,
  DocumentsGenerateClausesContent,
  DocumentsTopics,
} from "./documents.validators";

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

@SmurfAction({
  action: "/documents/documentPrint",
  message: "Document Print Successfully",
  method: HTTP_METHODS.GET,
})
export class DocumentPrintAction extends PdfResponse {
  async run(
    request: Request,
    response: import("express").Response
  ): Promise<void> {
    const ipAddress = request.ip;
    const dataInfo = await GetHistoryOfDocumentContractSrv(ipAddress);
    if (!dataInfo) {
      response.status(500).json({
        message: "no data",
      });
      return;
    }
    const dataToPrint = dataInfo.outline.map((r, index) =>
      renderClauseHTML(r, index)
    );

    const file = { content: dataToPrint.join("") };
    const pdfBuffer = await htmlToPdf.generatePdf(file, {
      format: "A4",
      margin: {
        top: "20mm",
        right: "15mm",
        bottom: "20mm",
        left: "15mm",
      },
    });

    response.contentType("application/pdf");
    response.send(pdfBuffer);
  }
}
