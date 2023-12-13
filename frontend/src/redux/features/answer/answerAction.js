import { useDispatch } from "react-redux";
import { client } from "../../../index";
import { setIsBookMark, setSingleAnswer } from "../answer/answerSlice";
import { BookMarkAnswer, CREATE_ANSWER, isBookMarkAnswer } from "../../../graphql/answer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useCreateAnswer() {
  const dispatch = useDispatch();
  const createAnswer = async (answerInput) => {
    try {
      console.log('answerInput', answerInput)
      const res = await client.mutate({
        mutation: CREATE_ANSWER,
        context: {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        },
        variables: { answerInput: answerInput },
      });
      if (res) {
        dispatch(setSingleAnswer(res));
        toast.success("Answer Created Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return { createAnswer };
}

export function useBookMarkAnswer() {
  const dispatch = useDispatch();
  const bookmark1 = async (answerId, userId) => {
    try {
      const res = await client.mutate({
        mutation: BookMarkAnswer,
        variables: {
          updateBookmarkedAnswerAnswerId2: answerId,
          updateBookmarkedAnswerUserId2: userId,
        },
        context: {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        },
      });
      if (res) 
      {
        dispatch(setIsBookMark());
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return { bookmark1 };
}

export function useIfBookMarkAnswer() {
    const dispatch = useDispatch();
    const bookmark1 = async (answerId, userId) => {
      try {
        const res = await client.mutate({
          mutation: isBookMarkAnswer,
          variables: {
            isBookmarkedAnswerAnswerId2: answerId,
            isBookmarkedAnswerUserId2: userId,
          },
          context: {
            headers: {
              authorization: `${localStorage.getItem("token")}`,
            },
          },
        });
        if (res) 
        {
          dispatch(setIsBookMark());
        }
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    return { bookmark1 };
  }