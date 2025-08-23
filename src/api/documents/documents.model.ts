/**
 * This File is for your model use
 */

import mongoose, { Schema, Document } from "mongoose";

export interface IFollowupQuestion extends Document {
  key: string;
  questions: {
    question: string;
    suggested_answer: string;
  }[];
  expiresAt: Date; // <-- required for TTL
}

const FollowupQuestionSchema: Schema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true, // optional if each key should be unique
      trim: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
          trim: true,
        },
        suggested_answer: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 1000 * 60 * 60), // now + 1 hour
      index: { expires: 0 }, // TTL 0s = expire immediately
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
