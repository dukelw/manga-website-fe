import { createSlice } from "@reduxjs/toolkit";

const mangaSlide = createSlice({
  name: "manga",
  initialState: {
    get: {
      manga: null,
      isFetching: false,
      error: false,
    },
    getAll: {
      mangas: null,
      isFetching: false,
      error: false,
    },
    getAllTrending: {
      mangas: null,
      isFetching: false,
      error: false,
    },
    getAllNew: {
      mangas: null,
      isFetching: false,
      error: false,
    },
    getAllRecently: {
      mangas: null,
      isFetching: false,
      error: false,
    },
    getAllGenres: {
      genres: null,
      isFetching: false,
      error: false,
    },
    findMangas: {
      mangas: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getMangaStart: (state) => {
      state.get.isFetching = true;
    },
    getMangaSuccess: (state, action) => {
      state.get.isFetching = false;
      state.get.manga = action.payload;
      state.get.error = false;
    },
    getMangaFailure: (state) => {
      state.get.isFetching = false;
      state.get.error = true;
    },
    getAllMangasStart: (state) => {
      state.getAll.isFetching = true;
    },
    getAllMangasSuccess: (state, action) => {
      state.getAll.isFetching = false;
      state.getAll.mangas = action.payload;
      state.getAll.error = false;
    },
    getAllMangasFailure: (state) => {
      state.getAll.isFetching = false;
      state.getAll.error = true;
    },
    getAllTrendingMangasStart: (state) => {
      state.getAllTrending.isFetching = true;
    },
    getAllTrendingMangasSuccess: (state, action) => {
      state.getAllTrending.isFetching = false;
      state.getAllTrending.mangas = action.payload;
      state.getAllTrending.error = false;
    },
    getAllTrendingMangasFailure: (state) => {
      state.getAllTrending.isFetching = false;
      state.getAllTrending.error = true;
    },
    getAllNewMangasStart: (state) => {
      state.getAllNew.isFetching = true;
    },
    getAllNewMangasSuccess: (state, action) => {
      state.getAllNew.isFetching = false;
      state.getAllNew.mangas = action.payload;
      state.getAllNew.error = false;
    },
    getAllNewMangasFailure: (state) => {
      state.getAllNew.isFetching = false;
      state.getAllNew.error = true;
    },
    getAllRecentlyMangasStart: (state) => {
      state.getAllRecently.isFetching = true;
    },
    getAllRecentlyMangasSuccess: (state, action) => {
      state.getAllRecently.isFetching = false;
      state.getAllRecently.mangas = action.payload;
      state.getAllRecently.error = false;
    },
    getAllRecentlyMangasFailure: (state) => {
      state.getAllRecently.isFetching = false;
      state.getAllRecently.error = true;
    },
    getAllGenresStart: (state) => {
      state.getAllGenres.isFetching = true;
    },
    getAllGenresSuccess: (state, action) => {
      state.getAllGenres.isFetching = false;
      state.getAllGenres.genres = action.payload;
      state.getAllGenres.error = false;
    },
    getAllGenresFailure: (state) => {
      state.getAllGenres.isFetching = false;
      state.getAllGenres.error = true;
    },
    findMangasStart: (state) => {
      state.findMangas.isFetching = true;
    },
    findMangasSuccess: (state, action) => {
      state.findMangas.isFetching = false;
      state.findMangas.mangas = action.payload;
      state.findMangas.error = false;
    },
    findMangasFailure: (state) => {
      state.findMangas.isFetching = false;
      state.findMangas.error = true;
    },
  },
});

export const {
  getMangaStart,
  getMangaSuccess,
  getMangaFailure,
  getAllMangasStart,
  getAllMangasSuccess,
  getAllMangasFailure,
  getAllTrendingMangasStart,
  getAllTrendingMangasSuccess,
  getAllTrendingMangasFailure,
  getAllNewMangasStart,
  getAllNewMangasSuccess,
  getAllNewMangasFailure,
  getAllRecentlyMangasStart,
  getAllRecentlyMangasSuccess,
  getAllRecentlyMangasFailure,
  getAllGenresStart,
  getAllGenresSuccess,
  getAllGenresFailure,
  findMangasStart,
  findMangasSuccess,
  findMangasFailure,
} = mangaSlide.actions;
export default mangaSlide.reducer;
