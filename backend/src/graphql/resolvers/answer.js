const { GraphQLError } = require("graphql");

module.exports = {
  Answer: {
    userId: async (parent, args, { UserContext }, info) => {
      const user = await UserContext.findById({ _id: parent.userId });
      return user;
    },
    questionId: async (parent, args, { QuestionContext }, info) => {
      const question = await QuestionContext.findById({
        _id: parent.questionId,
      });
      return question;
    },
  },
  AnswerResult: {
    __resolveType: (obj, context, info) => {
      if (obj.args) {
        return "AnswerFailure";
      }

      if (obj.answer) {
        return "AnswerSuccess";
      }

      return null;
    },
  },
  Mutation: {
    createAnswer: async (
      parent,
      { answerInput: { body, code, image, userId, questionId } },
      { AnswerContext, QuestionContext, UserContext },
      info
    ) => {
      try {
        let storedImage = "";

        if (image) {
          storedImage = await cloudinary.v2.uploader.upload(image, {
            upload_preset: "ml_default",
          });
        }

        const newAnswer = await AnswerContext.create({
          body,
          code,
          userId,
          questionId,
          image: storedImage ? storedImage.url : storedImage,
        });

        if (newAnswer) {
          await QuestionContext.findByIdAndUpdate(
            { _id: questionId },
            { $push: { answers: newAnswer._id } }
          );

          await UserContext.findByIdAndUpdate(
            { _id: userId },
            { $push: { answers: newAnswer._id } }
          );

          return {
            message: "Answer created",
            answer: newAnswer,
          };
        }

        return {
          message: "Error",
          args: "Error found",
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
    deleteAnswer: async (
      parent,
      { _id },
      { AnswerContext, UserContext, QuestionContext },
      info
    ) => {
      try {
        const answer = await AnswerContext.findById(_id);
        if (answer) {
          const deletedAnswer = await AnswerContext.findByIdAndRemove(_id);

          if (deletedAnswer) {
            await QuestionContext.updateOne(
              { _id: answer.questionId },
              { $pull: { answers: _id } }
            );
            await UserContext.updateOne(
              { _id: answer.userId },
              { $pull: { answers: _id } }
            );

            return true;
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
    upvoteAnswer: async (
      parent,
      { answerId, userId },
      { AnswerContext },
      info
    ) => {
      const answer = await AnswerContext.findById({ _id: answerId });
      if (answer) {
        const hasupVoted = answer.upvote.includes(userId);
        if (!hasupVoted) {
          const hasdownVoted = answer.downvote.includes(userId);
          if (!hasdownVoted) {
            const updatedUpVote = await AnswerContext.findByIdAndUpdate(
              { _id: answer._id },
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
    downvoteAnswer: async (
      parent,
      { answerId, userId },
      { AnswerContext },
      info
    ) => {
      const answer = await AnswerContext.findById({ _id: answerId });
      if (answer) {
        const hasupVoted = answer.upvote.includes(userId);
        if (!hasupVoted) {
          const hasdownVoted = answer.downvote.includes(userId);
          if (!hasdownVoted) {
            const updatedUpVote = await AnswerContext.findByIdAndUpdate(
              { _id: answer._id },
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
    isupvoteAnswer: async (
      parent,
      { answerId, userId },
      { AnswerContext },
      args
    ) => {
      const answer = await AnswerContext.findById({ _id: answerId });
      if (answer) {
        const hasViewed = answer.upvote.includes(userId);
        if (hasViewed) {
          return true;
        }
        return false;
      }
      return false;
    },
    isdownvoteAnswer: async (
      parent,
      { answerId, userId },
      { AnswerContext },
      args
    ) => {
      const answer = await AnswerContext.findById({ _id: answerId });
      if (answer) {
        const hasViewed = answer.downvote.includes(userId);
        if (hasViewed) {
          return true;
        }
        return false;
      }
      return false;
    },
    updateBookmarkedAnswer: async (
      parent,
      { answerId, userId },
      { AnswerContext, UserContext },
      args
    ) => {
      try {
        const answer = await AnswerContext.findById({ _id: answerId });
        if (answer) {
          const user = await UserContext.findById({ _id: userId });
          if (user) {
            const hasBookmarked = user.bookmarkedAnswers.includes(answerId);
            if (hasBookmarked) {
              await UserContext.updateOne(
                { _id: user._id },
                { $pull: { bookmarkedAnswers: answerId } }
              );
            } else {
              await UserContext.findByIdAndUpdate(
                { _id: user._id },
                { $push: { bookmarkedAnswers: answerId } }
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
  },
};
