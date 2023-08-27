import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    menu : false,
    search : false
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
        }
    }
})

export default basicSlice.reducer
export const {setMenu,setSearch} = basicSlice.actions