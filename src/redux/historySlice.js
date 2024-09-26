import { createSlice } from "@reduxjs/toolkit";

const historySlide = createSlice({
  name: "history",
  initialState: {
    getAll: {
      histories: null,
      isFetching: false,
      error: false,
    },
    create: {
      history: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getFullHistoryStart: (state) => {
      state.getAll.isFetching = true;
    },
    getFullHistorySuccess: (state, action) => {
      state.getAll.isFetching = false;
      state.getAll.histories = action.payload;
      state.getAll.error = false;
    },
    getFullHistoryFailure: (state) => {
      state.getAll.isFetching = false;
      state.getAll.error = true;
    },
    createHistoryStart: (state) => {
      state.create.isFetching = true;
    },
    createHistorySuccess: (state, action) => {
      state.create.isFetching = false;
      state.create.history = action.payload;
      state.create.error = false;
    },
    createHistoryFailure: (state) => {
      state.create.isFetching = false;
      state.create.error = true;
    },
  },
});

export const {
  getFullHistoryStart,
  getFullHistorySuccess,
  getFullHistoryFailure,
  createHistoryStart,
  createHistorySuccess,
  createHistoryFailure,
} = historySlide.actions;
export default historySlide.reducer;
