import {useDispatch} from 'react-redux'
import {client} from '../../../../src/index';
import {CREATE_TAG, GET_ALL_TAGS,GET_SINGLE_TAG, GET_TOP_TAGS} from '../../../graphql/tags'
import {setTags,setSingleTag, setTopTags, setPushTopTags} from '../tags/tagsSlice'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useGetAllTag(){
    const dispatch = useDispatch();
    const getAllTag = async () => {
        const res = await client.query({
            query : GET_ALL_TAGS
        })
        if(res?.data?.getAllTag)
        {
            dispatch(setTags(res?.data?.getAllTag));
        }
    }
    return{
        getAllTag
    }
}

export function useGetSingleTag()
{
    const dispatch = useDispatch();
    const getSingleTag = async (id) => {
        const res = await client.mutate({
            mutation : GET_SINGLE_TAG,
            variables : {id}
        })

        if(res.data.getSingleTag?.tag)
        {
            dispatch(setSingleTag(res.data.getSingleTag?.tag));
        }
    }
    return {getSingleTag}
}

export function useGetTopTags()
{
    const dispatch = useDispatch();
    const getAllTopTag = async () => {
        const res = await client.query({
            query : GET_TOP_TAGS
        })

        if(res)
        {
            dispatch(setTopTags(res?.data?.getAllTopTag));
        }
    }
    return {getAllTopTag}
}

export function useCreateTag()
{
    const dispatch = useDispatch();
    const createTag = async (TagName) => {
        try 
        {
            const res = await client.mutate({
                mutation : CREATE_TAG,
                variables : {TagName},
                context: {
                    headers: {
                        authorization: `${localStorage.getItem("token")}`,
                    },
                },
            })

            if(res?.data?.createTag?.args)
            {
                toast.error(res?.data?.createTag?.message, {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }
                else
                {
                    dispatch(setPushTopTags(res?.data?.createTag?.tag))
                    toast.success("Tag Created Successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                  });
            }
        }
        catch (error) 
        {
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
        }
    }
    return {createTag}
}