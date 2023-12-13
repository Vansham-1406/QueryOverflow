const { GraphQLError } = require("graphql");
const Openai = require("openai");
const { OPEN_API } = require("../../config/index");
const cloudinary = require("../../services/cloudinary");

const openai = new Openai({
  apiKey: OPEN_API,
});

module.exports = {
  Question: {
    answers: (parent, args, { AnswerContext }, info) => {
      const allAnswer = parent.answers.map(async (singleAnswer) => {
        const newAnswer = await AnswerContext.findById(singleAnswer);
        if (newAnswer) {
          return newAnswer;
        }
      });

      return allAnswer;
    },
    tags: (parent, args, { TagContext }, info) => {
      const allTags = parent.tags.map(async (singleTag) => {
        const newTag = await TagContext.findById(singleTag);
        if (newTag) {
          return newTag;
        }
      });
      return allTags;
    },
    userId: async (parent, args, { UserContext }, info) => {
      const user = await UserContext.findById({ _id: parent.userId });
      return user;
    },
    view: async (parent, args, { UserContext }, info) => {
      const allUser = parent.view.map(async (singleUser) => {
        const newUser = await UserContext.findById(singleUser);
        return newUser;
      });
      return allUser;
    },
    upvote: async (parent, args, { UserContext }, info) => {
      const allUser = parent.upvote.map(async (singleUser) => {
        const newUser = await UserContext.findById(singleUser);
        return newUser;
      });
      return allUser;
    },
    downvote: async (parent, args, { UserContext }, info) => {
      const allUser = parent.downvote.map(async (singleUser) => {
        const newUser = await UserContext.findById(singleUser);
        return newUser;
      });
      return allUser;
    },
  },
  QuestionResult: {
    __resolveType(obj, context, info) {
      if (obj.args) {
        return "QuestionFailure";
      }

      if (obj.question) {
        return "QuestionSuccess";
      }
      return null;
    },
  },
  Query: {
    getAllQuestion: async (parent, args, { QuestionContext }, info) => {
      try {
        const questions = await QuestionContext.find({}).sort({
          createdAt: -1,
        });
        return questions;
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
    createQuestion: async (
      parent,
      { inputQuestion: { title, body, code, image, chatGptOpt, userId, tags } },
      { QuestionContext, UserContext, TagContext },
      info
    ) => {
      try {
        if (chatGptOpt === true) {
          const newBody = title + "\n" + body + "\n" + code;
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: newBody }],
          });

          chatGptAnswer = response.choices[0].message.content;
        }

        let storedImage = "";

        if (image) {
          storedImage = await cloudinary.v2.uploader.upload(image, {
            upload_preset: "ml_default",
          });
        }
        const newQuestion = await QuestionContext.create({
          title,
          body,
          code,
          chatGptOpt,
          chatGptAnswer,
          userId,
          tags,
          image: storedImage ? storedImage.url : "",
        });

        if (newQuestion) {
          const updatedUser = await UserContext.findByIdAndUpdate(
            { _id: userId },
            { $push: { questions: newQuestion._id } }
          );

          // Update the tags with the new question ID
          for (const singleTag of tags) {
            await TagContext.findByIdAndUpdate(
              { _id: singleTag },
              { $push: { question: newQuestion._id } }
            );
          }

          if (updatedUser) {
            return {
              message: "Question Created",
              question: newQuestion,
            };
          }
        }

        return {
          message: "Error",
          args: "Question not created",
        };
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
    upvoteQuestion: async (
      parent,
      { questionId, userId },
      { QuestionContext },
      info
    ) => {
      const question = await QuestionContext.findById({ _id: questionId });
      if (question) {
        const hasupVoted = question.upvote.includes(userId);
        if (!hasupVoted) {
          const hasdownVoted = question.downvote.includes(userId);
          if (!hasdownVoted) {
            const updatedUpVote = await QuestionContext.findByIdAndUpdate(
              { _id: question._id },
              { $push: { upvote: userId } }
            );
            if (updatedUpVote) {
              return "true";
            }
          }
          return "false";
        }
        return "false";
      }
      return "false";
    },
    downvoteQuestion: async (
      parent,
      { questionId, userId },
      { QuestionContext },
      info
    ) => {
      const question = await QuestionContext.findById({ _id: questionId });
      if (question) {
        const hasupVoted = question.upvote.includes(userId);
        if (!hasupVoted) {
          const hasdownVoted = question.downvote.includes(userId);
          if (!hasdownVoted) {
            const updatedUpVote = await QuestionContext.findByIdAndUpdate(
              { _id: question._id },
              { $push: { downvote: userId } }
            );
            if (updatedUpVote) {
              return "true";
            }
          }
          return "false";
        }
        return "false";
      }
      return "false";
    },
    viewQuestion: async (
      parent,
      { questionId, userId },
      { QuestionContext },
      args
    ) => {
      const question = await QuestionContext.findById({ _id: questionId });
      if (question) {
        const hasViewed = question.view.includes(userId);
        if (!hasViewed) {
          const hasView = await QuestionContext.findByIdAndUpdate(
            { _id: question._id },
            { $push: { view: userId } }
          );
        }
      }
      return "true";
    },
    isupvote: async (
      parent,
      { questionId, userId },
      { QuestionContext },
      args
    ) => {
      const question = await QuestionContext.findById({ _id: questionId });
      if (question) {
        const hasViewed = question.upvote.includes(userId);
        if (hasViewed) {
          return true;
        }
        return false;
      }
      return false;
    },
    isdownvote: async (
      parent,
      { questionId, userId },
      { QuestionContext },
      args
    ) => {
      const question = await QuestionContext.findById({ _id: questionId });
      if (question) {
        const hasViewed = question.downvote.includes(userId);
        if (hasViewed) {
          return true;
        }
        return false;
      }
      return false;
    },

    getSingleQuestion: async (
      parent,
      { questionId },
      { QuestionContext },
      args
    ) => {
      try {
        const question = await QuestionContext.findById({ _id: questionId });
        if (!question) {
          return { message: "Question not found", args: questionId };
        }
        return {
          message: "Question found",
          question,
        };
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
    updateBookmarkedQuestion: async (
      parent,
      { questionId, userId },
      { QuestionContext, UserContext },
      args
    ) => {
      try {
        const question = await QuestionContext.findById({ _id: questionId });
        if (question) {
          const user = await UserContext.findById({ _id: userId });
          if (user) {
            const hasBookmarked = user.bookmarkedQuestions.includes(questionId);
            if (hasBookmarked) {
              await UserContext.updateOne(
                { _id: user._id },
                { $pull: { bookmarkedQuestions: questionId } }
              );
            } else {
              await UserContext.findByIdAndUpdate(
                { _id: user._id },
                { $push: { bookmarkedQuestions: questionId } }
              );
            }
          }
        }
        return true;
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
    isBookmarkedQuestion: async (
      parent,
      { questionId, userId },
      { QuestionContext, UserContext },
      args
    ) => {
      try {
        const question = await QuestionContext.findById({ _id: questionId });
        if (question) {
          const user = await UserContext.findById({ _id: userId });
          if (user) {
            const hasBookmarked = user.bookmarkedQuestions.includes(questionId);
            if (hasBookmarked) {
              return true;
            } else {
              return false;
            }
          }
        }
        return false;
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
    deleteQuestion: async (
      parent,
      { questionId },
      { QuestionContext, UserContext, TagContext },
      args
    ) => {
      try {
        const question = await QuestionContext.findById({ _id: questionId });
        if (question) {
          await UserContext.updateOne(
            { _id: question.userId },
            { $pull: { questions: questionId } }
          );
          await Promise.all(
            question.tags.map(async (singleTag) => {
              await TagContext.updateOne(
                { _id: singleTag },
                { $pull: { question: questionId } }
              );
            })
          );

          await QuestionContext.findByIdAndRemove({ _id: questionId });
          return true;
        }
        return false;
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
};
