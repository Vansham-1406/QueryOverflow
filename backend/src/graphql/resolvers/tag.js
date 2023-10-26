const Openai = require("openai");
const { OPEN_API } = require("../../config/index");
const { GraphQLError } = require("graphql");

const openai = new Openai({
  apiKey: OPEN_API,
});

module.exports = {
  Tag: {
    question: (parent, args, { QuestionContext }, info) => {
      const allQuestion = parent.question.map(async (singleQuestion) => {
        const singlequestion = await QuestionContext.findById(singleQuestion);
        if (singlequestion) {
          return singlequestion;
        }
      });
      return allQuestion;
    },
  },
  TagResult: {
    __resolveType: (obj, context, info) => {
      if (obj.args) {
        return "TagFailure";
      }

      if (obj.tag) {
        return "TagSuccess";
      }

      return null;
    },
  },
  Query: {
    getAllTag: async (parent, args, { TagContext }, info) => {
      const allTag = await TagContext.find({}).sort({ question: -1 });
      return allTag;
    },
    getAllTopTag: async (parent, args, { TagContext }, info) => {
      try {
        const topTags = await TagContext.find({}).sort({ question: -1 }).limit(20);
        return topTags;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "UNAUTHORIZED",
            http: {
              status: 401,
            },
          },
        });
      }
    },
  },
  Mutation: {
    createTag: async (parent, { TagName }, { TagContext }, info) => {
      try {
        const Tn = TagName.toLowerCase();
        const tagCheck = await TagContext.findOne({ TagName : Tn });
        if (tagCheck) {
          return {
            message: "Duplicate tag",
            args: TagName,
          };
        } else {
          const tagInfo = `This is the ${TagName} of the tag, I am creating it for my website. I just need a description of this of 50 words. Only description. No words should be from your side like sure, or anything like that`;
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: tagInfo }],
          });

          body = response.choices[0].message.content;
          if (body) {
            const tag = await TagContext.create({ TagName : Tn, body });
            return {
              message: "Tag Successfully created",
              tag,
            };
          }
        }
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "UNAUTHORIZED",
            http: {
              status: 401,
            },
          },
        });
      }
    },

    getSingleTag: async (parent, { _id }, { TagContext }, info) => {
      const tag = await TagContext.findById({ _id });

      if (!tag) {
        return {
          message: "Tag not found",
          args: _id,
        };
      }

      return {
        message: "Tag found",
        tag,
      };
    },
  },
};
