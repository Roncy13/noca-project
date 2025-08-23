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
import {
  IDocumentDraftClauses,
  IDocumentGenerateContent,
  IDocumentsBasicQuestion,
  IDocumentTopicsToAsk,
} from "./documents.types";
import { LegalDocumentSchema } from "./documents.zod";
import { FollowupQuestion } from "./documents.model";
const commonOpenAiProps = {
  model: "llama3.1:8b",
  temperature: 0.1,
  max_completion_tokens: 4096,
  top_p: 0.9,
  frequency_penalty: 1.1, // Similar to repeat_penalty
};
const documentContext = `
    You are an expert legal assistant specializing in Philippine Labor Law and the Information Technology industry. Your task is to generate a comprehensive and professionally formatted Employment Contract.

    **CRITICAL RULES:**
    1.  **Philippine Law Compliance:** The contract must be strictly aligned with the Philippine Labor Code. This includes, but is not limited to, provisions on mandatory benefits (SSS, PhilHealth, Pag-IBIG), 13th-month pay, rightful grounds for termination, and prescribed working hours and overtime pay.
    2.  **IT Industry Specifics:** Include clauses relevant to IT professionals, such as: Data Privacy and Confidentiality (aligned with the Philippine Data Privacy Act of 2012), Intellectual Property ownership for work product, non-compete agreements (within reasonable limits enforceable by Philippine law), and clear terms on provision and use of company-owned technology equipment.
    3.  **Structure & Format:** Generate the complete contract using clear Markdown formatting. Use headings, bullet points, bold text for important terms, and placeholders in [square brackets] for user-specific details (e.g., [Company Name], [Employee Name], [Exact Monthly Salary in PHP]).
    4.  **Clarity:** Use clear, formal, and unambiguous language. Avoid overly complex legal jargon where possible.
    5.  **Title:** Generate a suitable title for the document created
`;

const IMPORTANT_NOTE = `!!!IMPORTANT: Respond ONLY with valid JSON`;

export const AskAnyQuestionSrv = async () => {
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
      ...commonOpenAiProps,
      response_format: zodResponseFormat(LegalDocumentSchema, "response"),
    });
    const result = response.choices[0]?.message?.content;

    return JSON.parse(result);
  } catch (error) {
    throw new Error(
      `Failed to get response from DeepSeek: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const GenerateKeyIfNotExist = (ipAddress: string) => {
  return FollowupQuestion.findOne({
    key: ipAddress,
  });
};

// export const UpdateGenerateFollowupQuestionSrv = (
//   payload: Pick<IDocumentsBasicQuestion, "questions">,
//   key: string
// ) => {
//   console.log(payload, " paylaod");
//   return FollowupQuestion.findOneAndUpdate(
//     {
//       key,
//     },
//     {
//       $set: {
//         questions: payload.questions,
//       },
//     },
//     {
//       new: true,
//       upsert: true,
//     }
//   );
// };

export const GenerateBaseQuestionsToAskSrv = async (
  payload: IDocumentTopicsToAsk
) => {
  const userContent = `
        You are an AI Legal Document Assistant. Your task is to generate a list of **at least 5 or more distinct topics** for follow-up questions based on the input information.  

        Rules:  
        1. Respond ONLY in valid JSON with exactly one property:  
        {
        "topics": ["topic1", "topic2", ...]
        }  
        2. Topics must be distinct and cover different aspects of the information provided.  
        3. Do NOT include explanations or any text outside of the JSON.  

        Input information:  
        Type: ${payload.type}  
        Jurisdiction: ${payload.jurisdiction}  
        Industry: ${payload.industry}  
        Other Details: ${payload.otherDetails ?? "N/A"}  

        Example response format:  
        {
            "topics": [
                "Compliance requirements under Philippine law",
                "Software integration with POS systems",
                "Data privacy concerns for customer data",
                "Inventory and order management",
                "Employee training requirements"
            ]
        }
        ${IMPORTANT_NOTE}
  `;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userContent,
        },
      ],
      model: "phi3:mini",
      response_format: { type: "json_object" },
    });

    const result = response.choices[0]?.message.content;

    return JSON.parse(result);
  } catch (error) {
    throw new Error(
      `Failed to get response from DeepSeek: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const GenerateFollowupQuestionSrv = async (
  payload: IDocumentsBasicQuestion
) => {
  const userContent = `Please generate a followup question document: ${
    payload.type
  }, Jurisdiction: ${payload.jurisdiction} in the industry of ${
    payload.industry
  } ${payload.otherDetails ? `Other Details: ${payload.otherDetails}` : ""}
          Topic: ${payload.topic}
          `;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an AI Legal Document Assistant. 
            Your purpose is to generate ONLY ONE follow-up question for the information the user provided. 

            **Your Instructions:**
            1. Generate exactly 1 follow-up question related to the information provided.  
            2. For that question, create a suggested answer.  
            3. Respond ONLY in valid JSON — nothing else.  
            4. Do NOT generate a question that is repetitive in content or context with any of the questions already answered below. Even small overlaps in topic are considered repetitive.

            <Result>
            STRICTLY respond ONLY in a valid JSON OBJECT with these two properties:
            
            {
              "question": "string",
              "suggested_answer": "string"
            }

            Correct format example (for reference only, do not copy content):
            {
              "question": "What are your specific business needs within IT services that led you to draft an order?",
              "suggested_answer": "My company requires comprehensive outsourced software development and continuous maintenance for our existing applications."
            }
            </Result>
            ${IMPORTANT_NOTE}
          `,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      model: "phi3:mini",
      response_format: { type: "json_object" },
    });

    const result = response.choices[0]?.message.content;

    return JSON.parse(result);
  } catch (error) {
    throw new Error(
      `Failed to get response from DeepSeek: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const GenerateDraftSrv = async (
  payload: IDocumentDraftClauses,
  key: string
) => {
  const userContent = `Please create me a draft sections for  ${
    payload.type
  }, Jurisdiction: ${payload.jurisdiction} in the industry of ${
    payload.industry
  } ${payload.otherDetails ? `Other Details: ${payload.otherDetails}` : ""}
          Topic: ${payload.topic}
          Supporting Details: ${payload.supportingDetails}
          `;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
            You are an AI Legal Document Assistant. 

            Your task is to generate draft sections for a document based on the information provided.

            ⚠️ RULES:
            1. Respond ONLY in valid JSON — nothing else.  
            2. The JSON must be a single object with having 1 property which is "sections".  
            3. "sections" must be an array of strings only.  
            4. Each string should describe a section or component of the document in concise detail.  
            5. Do NOT include any objects, key-value pairs, single quotes, or extra text inside the array.  
            6. Make sure sections are comprehensive, logical, and correlated to each other.

            Input Information:
            Type: {payload.type}  
            Jurisdiction: {payload.jurisdiction}  
            Industry: {payload.industry}  
            Other Details: {payload.otherDetails ?? "N/A"}

            Example response format (do not copy content, this is just structure):

            {
                "sections": [
                    "Header: Company Logo, Company Name & Contact Information (Address, Phone, Email, Website), Document Title, Document Number, Document Date",
                    "Client Information: Client Name, Contact Person, Client Address, Email / Phone",
                    "Project / Service Details: Description of service, Service Type, Hours / Quantity, Rate / Unit Price, Total, Project or task codes, Milestone or deliverable reference",
                    "Subtotal: Sum of all items before taxes or discounts",
                    "Taxes / Fees: VAT / GST (if applicable), Service Tax / Other applicable taxes",
                    "Discounts (if applicable): Percentage or flat amount",
                    "Total Amount Due: Final amount to pay, clearly highlighted",
                    "Payment Terms: Accepted Payment Methods, Bank Details, Late Payment Penalties, Currency",
                    "Notes / Additional Information: Project reference numbers, License or software usage terms, Thank you note or custom message",
                    "Footer: Legal disclaimers or terms & conditions, Contact for document queries"
                ]
            }
            ${IMPORTANT_NOTE}
          `,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      model: "phi3:mini",
      response_format: { type: "json_object" },
    });

    const result = response.choices[0]?.message.content;

    return JSON.parse(result);
  } catch (error) {
    throw new Error(
      `Failed to get response from DeepSeek: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const GenerateSectionContentSrv = async (
  payload: IDocumentGenerateContent,
  key: string
) => {
  const userContent = `Please create me a content for section: ${
    payload.outline
  } of ${payload.type}, Jurisdiction: ${
    payload.jurisdiction
  } in the industry of ${payload.industry} ${
    payload.otherDetails ? `Other Details: ${payload.otherDetails}` : ""
  }
          Topic: ${payload.topic}
          Supporting Details: ${payload.supportingDetails}
        
          `;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
            You are an AI Legal Document Assistant.
            Your role is to generate professional, formal, and verbose legal content for one document section based on the provided outline.

            ⚖️ Rules and Requirements:

            Respond only in valid JSON — no extra commentary or text outside the JSON.

            The JSON output must be a single object containing the following properties only:

            "section" → must always be a formal, contract-style title (e.g., “Representations and Warranties of the Parties”, “Confidentiality Obligations”), never a raw description or placeholder heading.

            "clause" → must always be a single string containing the full, professional, legalized language for that section.

            "subClause" → if included, must strictly be an array of strings only, OMIT HYPEN, BULLETS, ASTERISK OR OTHER ITEM SYMBOLS, where each string is a contract-like elaboration written in bullet/hyphen style. If not needed, omit this property entirely.

            No properties other than "section", "clause", and (optional) "subClause" may appear.

            Both "clause" and "subClause" must be written in a contractual, authoritative tone, resembling enforceable legal agreements or business documentation.

            The values for "section" and "clause" must be strings only; "subClause" must be an array of strings only.

            Replace all full names, signatories, dates, companies, items, or proper nouns with placeholders unless explicitly stated in the outline. Use the format:

            [NAME], [SIGNATORY], [SIGNED_DATE], [COMPANY], [ITEM], etc.

            Or insert neutral placeholders such as [insert company name here].

            Never invent or introduce actual names or entities unless they are provided.

            The text must be self-contained, authoritative, and worded as if it belongs in a binding contract or professional report.
            ✅ Expected Output Example:
            {
                "section": "Formal Header and Identifying Information of the Agreement",
                "clause": "The formal header of the Agreement shall incorporate the Company’s insignia, registered business name, official contact details, document title, reference number, and date of issuance, all of which collectively establish the identity, authenticity, and traceability of the Agreement within business and legal records of the parties concerned.",
                "subClause": [
                    "Corporate Markings: The Company shall display its official logo and insignia, which form part of its recognized corporate identity.",
                    "Registered Identification: The business name of [COMPANY] shall be expressly stated, in accordance with its registration under Philippine law.",
                    "Official Communication Channels: The Company’s address, telephone, email, and other designated communication lines shall be reflected for purposes of notice and correspondence.",
                    "Document Reference: The title, number, and issuance date of this Agreement shall be clearly indicated to ensure enforceability, accurate filing, and retrieval.",
                    "Authenticity Assurance: The header shall serve as prima facie proof of the Agreement’s origin and validity, binding the parties hereto."
                ]
            }

            ${IMPORTANT_NOTE}
          `,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      model: "llama3.1:8b",
      // model: "phi3:mini",
      response_format: { type: "json_object" },
    });

    const result = response.choices[0]?.message.content;

    return JSON.parse(result);
  } catch (error) {
    throw new Error(
      `Failed to get response from DeepSeek: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
