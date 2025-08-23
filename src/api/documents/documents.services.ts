/**
 * For Typeorm use
 * import { GetConnection } from '@config/database';
 * const model = GetConnection( Put Your Typeorm Schema Here);
 * export function DocumentsAllSrv() {
 *   return model.find();
 * }
 */

import { openai } from "@config/app-settings/openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { LegalDocumentSchema } from "./documents.zod";
const documentContext = `
    You are an expert legal assistant specializing in Philippine Labor Law and the Information Technology industry. Your task is to generate a comprehensive and professionally formatted Employment Contract.

    **CRITICAL RULES:**
    1.  **Philippine Law Compliance:** The contract must be strictly aligned with the Philippine Labor Code. This includes, but is not limited to, provisions on mandatory benefits (SSS, PhilHealth, Pag-IBIG), 13th-month pay, rightful grounds for termination, and prescribed working hours and overtime pay.
    2.  **IT Industry Specifics:** Include clauses relevant to IT professionals, such as: Data Privacy and Confidentiality (aligned with the Philippine Data Privacy Act of 2012), Intellectual Property ownership for work product, non-compete agreements (within reasonable limits enforceable by Philippine law), and clear terms on provision and use of company-owned technology equipment.
    3.  **Structure & Format:** Generate the complete contract using clear Markdown formatting. Use headings, bullet points, bold text for important terms, and placeholders in [square brackets] for user-specific details (e.g., [Company Name], [Employee Name], [Exact Monthly Salary in PHP]).
    4.  **Clarity:** Use clear, formal, and unambiguous language. Avoid overly complex legal jargon where possible.
`;
export const AskAnyQuestionSrv = async (): Promise<object> => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an AI Legal Document Assistant. Your purpose is to help users generate clear, well-structured, and professionally formatted legal documents.
            **Your Instructions:**
            1.  **Gather Information:** if the user's request is missing crucial information (e.g., names, dates, addresses, specific terms), generate placeholders for the missing crucial information, ex: [NAME], [DATES] and etc.
            2.  **Generate Accurately:** Use standard legal phrasing and formatting for the requested document type, the legality is based on the jurisdiction if provided, if not provided then create a generically sound legal document that is robust and would be viewed as legally Intentful in a common law context.
            3.  **Structure the Output:** Always generate the complete document in a single code block using appropriate markup (like Markdown)
            You will be given a information about a document. Please use that information to create the document that the user ask
        `,
        },
        {
          role: "user",
          content: `Please generate a Employee Cotract Agreement for me. Here is the context: ${documentContext}`,
        },
      ],
      model: "llama3.1:8b",
      temperature: 0.1,
      max_completion_tokens: 4096,
      top_p: 0.9,
      frequency_penalty: 1.1, // Similar to repeat_penalty
      response_format: zodResponseFormat(LegalDocumentSchema, "response"),
    });
    const result = response.choices[0]?.message?.content;

    return JSON.parse(result);
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    throw new Error(
      `Failed to get response from DeepSeek: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
