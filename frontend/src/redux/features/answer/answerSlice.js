import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleAnswer: {},
};

const answerSlice = createSlice({
  name: "Answer",
  initialState,
  reducers: {
    setSingleAnswer(state, action) {
      state.singleAnswer = action.payload;
    },
  },
});

export default answerSlice.reducer;
export const { setSingleAnswer } = answerSlice.actions;
