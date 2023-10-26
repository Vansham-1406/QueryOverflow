const Mongoose = require("mongoose");

const QuestionSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    body: {
      type: String,
      required: true,
      minLength: 10,
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
