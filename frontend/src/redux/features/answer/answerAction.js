import {useDispatch} from 'react-redux';
import {client} from '../../../index'
import {setSingleAnswer} from '../answer/answerSlice'
import {CREATE_ANSWER} from '../../../graphql/answer'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useCreateAnswer(){
    const dispatch = useDispatch();
    const createAnswer = async (answerInput) => {
        try 
        {
            const res = await client.mutate({
                mutation : CREATE_ANSWER,
                context: {
                    headers: {
                        authorization: `${localStorage.getItem("token")}`,
                    },
                },
                variables : {answerInput : answerInput},
            })
            if(res)
            {
                dispatch(setSingleAnswer(res));
            }
        } 
        catch (error) 
        {
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
        }

    }
    return {createAnswer}
} 