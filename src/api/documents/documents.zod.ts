// schema.js
import { z } from "zod";
// Define the schema for the structured data you want
export const LegalDocumentSchema = z.object({
  title: z.string().describe("The title given of the document"),
  content: z.string().describe("The full content of the document"),
});
