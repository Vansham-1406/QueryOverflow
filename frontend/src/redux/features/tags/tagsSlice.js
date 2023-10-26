import {createSlice} from '@reduxjs/toolkit'

const initialState = ({
    tags : [],
    loading : false,
    singleTag : {},
    topTag : []
})

const tagSlice = createSlice({
    name : "Tags",
    initialState,
    reducers : {
        setTags(state,action)
        {
            state.tags = action.payload
        },
        setSingleTag(state,action)
        {
            state.singleTag = action.payload
        },
        setTopTags(state,action)
        {
            state.topTag = action.payload;
        },
        setPushTopTags(state,action)
        {
            state.topTag.push(action.payload);
            state.tags.push(action.payload);
        }
    }
})

export default tagSlice.reducer;
export const {setTags,setSingleTag,setTopTags,setPushTopTags} = tagSlice.actions;