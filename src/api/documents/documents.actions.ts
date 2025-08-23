import SmurfResponse, { SmurfAction } from "@core/response";
import PdfResponse from "@core/pdfResponse";
import htmlToPdf from "html-pdf-node";

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
import puppeteer from "puppeteer";

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
  async run(request: Request) {
    const res = request.res;
    // Create a new PDF document
    const dataToPrint = `<img src = "data:image/jpeg;base64,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" height="50" width = "50"/><div class="section-content">
  <h3 style="color: blue;">Header: Company Logo, Business Name & Contact Information, Document for Restaurant Software Application Order</h3>
  <p>This Agreement is a binding contract between [COMPANY AGENCY], the Provider of the customer software application, and [INSERT CUSTOMER NAME HERE], the Customer seeking to utilize the restaurant software application for their business operations. The Agreement establishes the terms and conditions applicable to the use of the software application, including data protection and confidentiality.</p>
  <ul>
    <li>Authorized Representation: By executing this document, both parties acknowledge that they are authorized representatives of their respective organizations, with full capacity to bind their employers to these obligations.</li>
    <li>Software Application Description: The restaurant software application (‘Application’) includes a point of sale system for managing inventory and customer information, and shall be specifically designed for the needs of [INSERT RESTAURANT NAME HERE], as outlined in the request details.</li>
    <li>Scope of Work: The Provider will provide complete implementation support for integrating the Application with [INSERT INVENTORY MANAGEMENT SOFTWARE HERE] and performing tests to ensure a seamless deployment and performance.</li>
    <li>Data Protection Obligations: As per Philippine laws on data protection, particularly Republic Act 10173 otherwise known as Data Privacy Act, both parties agree that all customer transaction information collected through the Application shall be securely stored and processed with utmost confidentiality, in accordance with applicable regulatory requirements.</li>
  </ul>
</div>`;
    const html =
      "<h1>Restaurant Agreement</h1><p>This Agreement is binding between [COMPANY] and [CUSTOMER].</p><ul><li>Authorized Representation</li><li>Scope of Work</li></ul>";
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();

    // // Set the HTML content
    // await page.setContent(html, { waitUntil: "networkidle0" });

    // // Generate PDF buffer
    // const pdfBuffer = await page.pdf({
    //   format: "A4",
    //   printBackground: true, // print CSS backgrounds
    //   margin: { top: "20mm", bottom: "20mm", left: "20mm", right: "20mm" },
    // });

    // await browser.close();

    // // Return PDF
    // res.contentType("application/pdf");
    // res.send(pdfBuffer);
    // // Pipe the PDF stream to the response
    // doc.pipe(request.res);

    // // Add content
    // doc.fontSize(20).text("Sample PDF Document", { align: "center" });
    // doc.moveDown();
    // doc
    //   .fontSize(12)
    //   .text("This is an example PDF generated using PDFKit in Express.js.");
    // doc.moveDown();

    // doc.text(
    //   "You can add multiple lines, images, tables, or even draw shapes here.",
    //   {
    //     align: "justify",
    //   }
    // );

    // // Finish the PDF
    // doc.end();
    const file = { content: dataToPrint };
    const pdfBuffer = await htmlToPdf.generatePdf(file, { format: "A4" });

    res.contentType("application/pdf");
    res.send(pdfBuffer);
  }
}
