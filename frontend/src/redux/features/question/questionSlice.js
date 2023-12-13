import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    AllQuestion : [],
    singlequestion : {},
    loading : false,
    isupvote : false,
    isdownvote : false,
    isbookmark : false
}

const questionSlice = createSlice({
    name : "Question",
    initialState,
    reducers : {
        setAllQuestion(state,action)
        {
            state.AllQuestion = action.payload;
        },
        setLoading(state,action)
        {
            state.loading = action.payload;
        },
        setSingleQuestion(state,action)
        {
            state.singlequestion = action.payload;
        },
        setUpVote(state,action)
        {
            state.isupvote = action.payload;
        },
        setDownVote(state,action)
        {
            state.isdownvote = action.payload;
        },
        getIsBookMark(state,action)
        {
            state.isbookmark = action.payload;
        },
        setIsBookMark(state,action)
        {
            state.isbookmark = !state.isbookmark;
        }
    }
})

export default questionSlice.reducer;
export const {setAllQuestion,setLoading,setSingleQuestion,setUpVote,setDownVote,setIsBookMark,getIsBookMark} = questionSlice.actions;