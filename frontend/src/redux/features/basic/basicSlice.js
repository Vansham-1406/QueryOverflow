import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    menu : false,
    search : false,
    questionSearch : []
}

const basicSlice = createSlice({
    name : "basic",
    initialState,
    reducers:{
        setMenu(state,action)
        {   
            state.menu = action.payload;
        },
        setSearch(state,action)
        {
            state.search = action.payload;
        },
        setQuestionSearch(state,action)
        {
            state.questionSearch = action.payload
        }
    }
})

export default basicSlice.reducer
export const {setMenu,setSearch,setQuestionSearch} = basicSlice.actions