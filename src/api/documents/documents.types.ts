export interface IDocumentsBasicQuestion {
  type: "invoice" | "order" | "invitation";
  jurisdiction: string;
  industry: string;
  otherDetails?: string;
}
