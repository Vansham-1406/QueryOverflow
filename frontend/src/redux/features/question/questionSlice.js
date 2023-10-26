import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    AllQuestion : [],
    singlequestion : {},
    loading : false
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
        }
    }
})

export default questionSlice.reducer;
export const {setAllQuestion,setLoading,setSingleQuestion} = questionSlice.actions;