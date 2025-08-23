/**
 * This File is for your model use
 */

import mongoose, { Schema, Document } from "mongoose";
import { ISectionContent } from "./documents.types";
import { formatContent } from "./document.utils";

export interface IFollowupQuestion extends Document {
  key: string;
  outline: ISectionContent[];
  expiresAt: Date; // <-- required for TTL
}

const SectionContentSchema: Schema<ISectionContent> = new Schema({
  no: { type: Number, required: true },
  section: { type: String, required: true },
  clause: { type: String, required: true },
  subClause: { type: [String], required: false }, // optional array
});

// Middleware to combine section, clause, and subClause into one string

// Post-find middleware for multiple documents
SectionContentSchema.post("find", function (docs: ISectionContent[]) {
  docs.forEach(formatContent);
});

// Post-findOne middleware for a single document
SectionContentSchema.post("findOne", function (doc: ISectionContent) {
  formatContent(doc);
});

// Optionally include for findOneAndUpdate
SectionContentSchema.post("findOneAndUpdate", function (doc: ISectionContent) {
  formatContent(doc);
});

const FollowupQuestionSchema: Schema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true, // optional if each key should be unique
      trim: true,
    },
    outline: {
      type: [SectionContentSchema],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// 🔁 Ensure TTL is extended on every save
FollowupQuestionSchema.pre("save", function (next) {
  this.expiresAt = new Date(Date.now() + 1000 * 60 * 60); // extend 1h
  next();
});

// 🔁 Ensure TTL is extended on updates too
FollowupQuestionSchema.pre("findOneAndUpdate", function (next) {
  this.set({ expiresAt: new Date(Date.now() + 1000 * 60 * 60) }); // extend 1h
  next();
});

export const FollowupQuestion = mongoose.model<IFollowupQuestion>(
  "FollowupQuestion",
  FollowupQuestionSchema
);
