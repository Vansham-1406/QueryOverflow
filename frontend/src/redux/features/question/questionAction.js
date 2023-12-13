import { useDispatch } from "react-redux";
import { client } from "../../../../src/index";
import {
  getIsBookMark,
  setAllQuestion,
  setDownVote,
  setIsBookMark,
  setLoading,
  setSingleQuestion,
  setUpVote,
} from "../question/questionSlice";
import {
  CREATE_QUESTION,
  DownvoteQuestion,
  GET_ALL_QUESTION,
  GET_SINGLE_QUESTION,
  UpvoteQuestion,
  bookmarkQuestion,
  isDownVote,
  isUpVote,
  isbookmark,
} from "../../../graphql/question";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export function useGetSingleQuestion() {
  const dispatch = useDispatch();
  const getSingleQuestion = async (question) => {
    try {
      dispatch(setLoading(true));
      const res = await client.mutate({
        mutation: GET_SINGLE_QUESTION,
        variables: { question },
      });

      dispatch(setLoading(false));
      if (res) {
        dispatch(setSingleQuestion(res?.data?.getSingleQuestion?.question));
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return { getSingleQuestion };
}

export function useGetAllQuestion() {
  const dispatch = useDispatch();
  const getAllFunction = async () => {
    try {
      dispatch(setLoading(true));
      const res = await client.query({
        query: GET_ALL_QUESTION,
      });

      dispatch(setLoading(false));
      if (res) {
        dispatch(setAllQuestion(res?.data?.getAllQuestion));
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return { getAllFunction };
}

export function useCreateQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createQuestion = async (inputQuestion) => {
    try {
      dispatch(setLoading(true));
      const res = await client.mutate({
        mutation: CREATE_QUESTION,
        variables: { inputQuestion: inputQuestion },
        context: {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        },
      });

      if (res) {
        dispatch(setLoading(false));
        dispatch(setAllQuestion(res?.data?.createQuestion?.question));
        navigate(`/query/${res?.data?.createQuestion?.question?._id}`);
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return { createQuestion };
}

export function useCreateUpVote() {
  const dispatch = useDispatch();
  const createUpVote = async (questionId, userId) => {
    try {
      const res = await client.mutate({
        mutation: UpvoteQuestion,
        variables: {
          upvoteQuestionQuestionId2: questionId,
          upvoteQuestionUserId2: userId,
        },
        context: {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        },
      });

      if (res) {
        dispatch(setUpVote(res?.data?.isupvote));
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return {
    createUpVote,
  };
}

export function useCreateDownVote() {
  const dispatch = useDispatch();
  const createdownVote = async (questionId, userId) => {
    try {
      const res = await client.mutate({
        mutation: DownvoteQuestion,
        variables: {
          questionId,
          userId,
        },
        context: {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        },
      });
      if (res) {
        dispatch(setDownVote(res?.data?.isdownvote));
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return {
    createdownVote,
  };
}

export function useIfUpVote() {
  const dispatch = useDispatch();
  const ifUpVote = async (questionId, userId) => {
    try {
      const res = await client.mutate({
        mutation: isUpVote,
        variables: {
          isupvoteQuestionId2: questionId,
          isupvoteUserId2: userId,
        },
        context: {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        },
      });

      if (res) {
        dispatch(setUpVote(res?.data?.isupvote));
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return {
    ifUpVote,
  };
}

export function useIfDownVote() {
  const dispatch = useDispatch();
  const ifDownVote = async (questionId, userId) => {
    try {
      const res = await client.mutate({
        mutation: isDownVote,
        variables: {
          isdownvoteQuestionId2: questionId,
          isdownvoteUserId2: userId,
        },
        context: {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        },
      });

      if (res) {
        dispatch(setDownVote(res?.data?.isdownvote));
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return {
    ifDownVote,
  };
}

export function useBookMark() {
  const dispatch = useDispatch();
  const bookmark = async (questionId, userId) => {
    try {
      const res = await client.mutate({
        mutation: bookmarkQuestion,
        variables: {
          updateBookmarkedQuestionQuestionId2: questionId,
          updateBookmarkedQuestionUserId2: userId,
        },
        context: {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        },
      });
      if (res) {
        dispatch(setIsBookMark(res?.data?.updateBookmarkedQuestion));
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return { bookmark };
}

export function useIsBookmark() {
  const dispatch = useDispatch();
  const isBookMark = async (questionId, userId) => {
    try {
      const res = await client.mutate({
        mutation: isbookmark,
        variables: {
          isBookmarkedQuestionQuestionId2: questionId,
          isBookmarkedQuestionUserId2: userId,
        },
        context: {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        },
      });
      dispatch(getIsBookMark(res?.data?.isBookmarkedQuestion));
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return { isBookMark };
}
