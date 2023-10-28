import { useDispatch } from "react-redux";
import { client } from "../../../../src/index";
import {
  setAllQuestion,
  setLoading,
  setSingleQuestion,
} from "../question/questionSlice";
import {
  CREATE_QUESTION,
  GET_ALL_QUESTION,
  GET_SINGLE_QUESTION,
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
    console.log('data', inputQuestion)
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
