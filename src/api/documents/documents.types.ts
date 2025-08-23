export class IDocumentTopicsToAsk {
  type: "invoice" | "order" | "invitation";
  jurisdiction: string;
  industry: string;
  otherDetails?: string;
}
export class IDocumentsBasicQuestion extends IDocumentTopicsToAsk {
  topic: string;
}

export class IDocumentDraftClauses extends IDocumentsBasicQuestion {
  supportingDetails: string;
}

export class IDocumentGenerateContent extends IDocumentDraftClauses {
  outline: string;
  no: number;
}

export interface ISectionContent extends Document {
  no: number;
  section: string;
  clause: string;
  subClause?: string[]; // optional array of strings
  formattedContent?: string;
}
