const Mongoose = require("mongoose");

const TagSchema = new Mongoose.Schema(
  {
    TagName: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    question: [{
      type: Mongoose.Schema.ObjectId,
      ref: "Question",
    }],
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Tag", TagSchema);
