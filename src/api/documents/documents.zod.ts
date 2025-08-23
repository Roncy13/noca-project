// schema.js
import { z } from "zod";
// Define the schema for the structured data you want
export const LegalDocumentSchema = z.object({
  title: z.string().describe("The title given of the document"),
  content: z.string().describe("The full content of the document"),
});

const DocumentBasisQuestionSchema = z.object({
  question: z.string().describe("The generated question for the document"),
  suggested_answer: z
    .string()
    .describe("The suggested answer given to the question"),
});

export const DocumentBasisQuestionArraySchema = z.array(
  DocumentBasisQuestionSchema
);
