// schema.js
import { z } from "zod";
// Define the schema for the structured data you want
export const LegalDocumentSchema = z.object({
  documentTitle: z.string().describe("The formal title of the legal document"),
  summary: z
    .string()
    .describe("A one-paragraph summary of the document's purpose"),
  parties: z
    .array(
      z.object({
        name: z.string(),
        role: z.string(),
      })
    )
    .describe("An array of the parties involved in the agreement"),
  keyTerms: z
    .array(z.string())
    .describe("An array of the most important legal terms in the document"),
  documentBody: z
    .string()
    .describe("The full body of the legal document, formatted in Markdown"),
});
