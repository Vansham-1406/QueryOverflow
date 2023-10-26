import {createSlice} from '@reduxjs/toolkit';

const initialState = ({
    users : [],
    loadingUser : false,
    errorsUser : "",
    otp : "",
    SingleUser : {},
    SingleUserDetails : {}
});

const userSlice = createSlice({
    name : "User",
    initialState,
    reducers : {
        setUsers(state,action){
            state.users = action.payload
        },
        setErrors(state,action){
            state.errorsUser = action.payload
        },
        setLoading(state,action){
            state.loadingUser = action.payload
        },
        setOTP(state,action){
            state.otp = action.payload
        },
        setSingleUser(state,action){
            state.SingleUser = action.payload
        },
        setEmptySingleUser(state,action)
        {
            state.SingleUser = {}
        },
        setSingleUserDetails(state,action)
        {
            state.SingleUserDetails = action.payload;
        }
    }
})

export const {setUsers,setErrors,setLoading,setOTP,setSingleUser,setEmptySingleUser,setSingleUserDetails} = userSlice.actions;
export default userSlice.reducer;