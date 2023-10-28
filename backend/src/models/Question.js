const Mongoose = require("mongoose");

const QuestionSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    image: {
      type: String,
    },
    chatGptAnswer: {
      type: String,
    },
    chatGptOpt: {
      type: Boolean,
      required: true,
      default: false,
    },
    userId: {
      type: Mongoose.Schema.ObjectId,
      ref: "User",
    },
    answers: [
      {
        type: Mongoose.Schema.ObjectId,
        ref: "Answer",
      },
    ],
    tags: [
      {
        type: Mongoose.Schema.ObjectId,
        ref: "Tag",
      },
    ],
    view: [
      {
        type: Mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
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
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Question", QuestionSchema);
