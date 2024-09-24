import { createSlice } from "@reduxjs/toolkit";

const genreSlide = createSlice({
  name: "genre",
  initialState: {
    getMangas: {
      mangas: null,
      isFetching: false,
      error: false,
    },
    getAll: {
      genres: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getMangaByGenreStart: (state) => {
      state.getMangas.isFetching = true;
    },
    getMangaByGenreSuccess: (state, action) => {
      state.getMangas.isFetching = false;
      state.getMangas.mangas = action.payload;
      state.getMangas.error = false;
    },
    getMangaByGenreFailure: (state) => {
      state.getMangas.isFetching = false;
      state.getMangas.error = true;
    },
    getAllGenresStart: (state) => {
      state.getAll.isFetching = true;
    },
    getAllGenresSuccess: (state, action) => {
      state.getAll.isFetching = false;
      state.getAll.genres = action.payload;
      state.getAll.error = false;
    },
    getAllGenresFailure: (state) => {
      state.getAll.isFetching = false;
      state.getAll.error = true;
    },
  },
});

export const {
  getMangaByGenreStart,
  getMangaByGenreSuccess,
  getMangaByGenreFailure,
  getAllGenresStart,
  getAllGenresSuccess,
  getAllGenresFailure,
} = genreSlide.actions;
export default genreSlide.reducer;
