import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleAnswer: {},
  isbookmark: false,
};

const answerSlice = createSlice({
  name: "Answer",
  initialState,
  reducers: {
    setSingleAnswer(state, action) {
      state.singleAnswer = action.payload;
    },
    getIsBookMark(state, action) {
      state.isbookmark = action.payload;
    },
    setIsBookMark(state, action) {
      state.isbookmark = !state.isbookmark;
    },
  },
});

export default answerSlice.reducer;
export const { setSingleAnswer , setIsBookMark,getIsBookMark} = answerSlice.actions;
