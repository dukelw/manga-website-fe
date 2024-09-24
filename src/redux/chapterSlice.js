import { createSlice } from "@reduxjs/toolkit";

const chapterSlide = createSlice({
  name: "chapter",
  initialState: {
    get: {
      chapter: null,
      isFetching: false,
      error: false,
    },
    getAll: {
      chapters: null,
      isFetching: false,
      error: false,
    },
    findChapters: {
      chapters: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getChapterStart: (state) => {
      state.get.isFetching = true;
    },
    getChapterSuccess: (state, action) => {
      state.get.isFetching = false;
      state.get.chapter = action.payload;
      state.get.error = false;
    },
    getChapterFailure: (state) => {
      state.get.isFetching = false;
      state.get.error = true;
    },
    getAllChaptersStart: (state) => {
      state.getAll.isFetching = true;
    },
    getAllChaptersSuccess: (state, action) => {
      state.getAll.isFetching = false;
      state.getAll.chapters = action.payload;
      state.getAll.error = false;
    },
    getAllChaptersFailure: (state) => {
      state.getAll.isFetching = false;
      state.getAll.error = true;
    },
    findChaptersStart: (state) => {
      state.findChapters.isFetching = true;
    },
    findChaptersSuccess: (state, action) => {
      state.findChapters.isFetching = false;
      state.findChapters.chapters = action.payload;
      state.findChapters.error = false;
    },
    findChaptersFailure: (state) => {
      state.findChapters.isFetching = false;
      state.findChapters.error = true;
    },
  },
});

export const {
  getChapterStart,
  getChapterSuccess,
  getChapterFailure,
  getAllChaptersStart,
  getAllChaptersSuccess,
  getAllChaptersFailure,
  findChaptersStart,
  findChaptersSuccess,
  findChaptersFailure,
} = chapterSlide.actions;
export default chapterSlide.reducer;
