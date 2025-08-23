import { inBody } from "@utilities/constants";
import { Schema } from "express-validator";

/**
 * Change the [sampleFieldName] to the property you are using.
 * Change the Field Name to the name of the property you are using.
 * In Body just tells that the schema be used in the Body section of the request.
 */

export const DocumentsBasicQuestion: Schema = {
  type: {
    ...inBody,
    notEmpty: {
      errorMessage: "type is required",
    },
    isIn: {
      options: [["invoice", "order", "invitation"]],
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
