import { createSlice } from "@reduxjs/toolkit";

const favouriteSlide = createSlice({
  name: "favourite",
  initialState: {
    getAll: {
      favourites: null,
      isFetching: false,
      error: false,
    },
    create: {
      favourite: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getFavouriteStart: (state) => {
      state.getAll.isFetching = true;
    },
    getFavouriteSuccess: (state, action) => {
      state.getAll.isFetching = false;
      state.getAll.favourites = action.payload;
      state.getAll.error = false;
    },
    getFavouriteFailure: (state) => {
      state.getAll.isFetching = false;
      state.getAll.error = true;
    },
    createFavouriteStart: (state) => {
      state.create.isFetching = true;
    },
    createFavouriteSuccess: (state, action) => {
      state.create.isFetching = false;
      state.create.favourite = action.payload;
      state.create.error = false;
    },
    createFavouriteFailure: (state) => {
      state.create.isFetching = false;
      state.create.error = true;
    },
  },
});

export const {
  getFavouriteStart,
  getFavouriteSuccess,
  getFavouriteFailure,
  createFavouriteStart,
  createFavouriteSuccess,
  createFavouriteFailure,
} = favouriteSlide.actions;
export default favouriteSlide.reducer;
