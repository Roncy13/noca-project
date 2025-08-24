import { inBody } from "@utilities/constants";
import { Schema } from "express-validator";

/**
 * Change the [sampleFieldName] to the property you are using.
 * Change the Field Name to the name of the property you are using.
 * In Body just tells that the schema be used in the Body section of the request.
 */

export const DocumentsTopics: Schema = {
  type: {
    ...inBody,
    notEmpty: {
      errorMessage: "type is required",
    },
  },
  jurisdiction: {
    ...inBody,
    notEmpty: {
      errorMessage: "jurisdiction is required",
    },
  },
  industry: {
    ...inBody,
    notEmpty: {
      errorMessage: "industry is required",
    },
  },
  otherDetails: {
    ...inBody,
    optional: true,
  },
};
export const DocumentsBasicQuestion: Schema = {
  ...DocumentsTopics,
  topic: {
    ...inBody,
    notEmpty: {
      errorMessage: "topic is required",
    },
  },
};

export const DocumentsGenerateClauses: Schema = {
  ...DocumentsTopics,
  supportingDetails: {
    ...inBody,
    notEmpty: "supportingDetails is required",
  },
};

export const DocumentsGenerateClausesContent: Schema = {
  ...DocumentsGenerateClauses,
  outline: {
    ...inBody,
    notEmpty: "outline is required",
  },
  no: {
    ...inBody,
    notEmpty: true,
    isInt: true,
    min: 1,
  },
};
