const Mongoose = require("mongoose");

const AnswerSchema = new Mongoose.Schema(
  {
    body: {
      required: true,
      type: String,
    },
    code: {
      type: String,
    },
    image: {
      type: String,
    },
    userId: {
      type: Mongoose.Schema.ObjectId,
      ref: "User",
    },
    questionId: {
      type: Mongoose.Schema.ObjectId,
      ref: "Question",
    },
    upvote: [
      {
        type: Mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    downvote: [
      {
        type: Mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    answerInfo: {
      type: String,
      enum: ["OK", "CORRECT", "WRONG"],
      default: "OK",
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Answer", AnswerSchema);
