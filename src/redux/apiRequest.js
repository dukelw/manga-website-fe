import axios from "axios";

import {
  userSigninStart,
  userSigninSuccess,
  userSigninFailure,
  userSignupStart,
  userSignupSuccess,
  userSignupFailure,
  userLogoutStart,
  userLogoutSuccess,
  userLogoutFailure,
  findUserStart,
  findUserSuccess,
  findUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  findAllUsersStart,
  findAllUsersSuccess,
  findAllUsersFailure,
} from "./userSlice";
import {
  uploadAudioFailure,
  uploadAudioStart,
  uploadAudioSuccess,
  uploadImageFailure,
  uploadImageStart,
  uploadImageSuccess,
} from "./uploadSlice";
import {
  createSliderFailure,
  createSliderStart,
  createSliderSuccess,
  deleteSliderFailure,
  deleteSliderStart,
  deleteSliderSuccess,
  getActiveSlidersFailure,
  getActiveSlidersStart,
  getActiveSlidersSuccess,
  getAllSlidersFailure,
  getAllSlidersStart,
  getAllSlidersSuccess,
  getByCollectionFailure,
  getByCollectionStart,
  getByCollectionSuccess,
  getCollectionsFailure,
  getCollectionsStart,
  getCollectionsSuccess,
  getSliderFailure,
  getSliderStart,
  getSliderSuccess,
  toggleSliderFailure,
  toggleSliderStart,
  toggleSliderSuccess,
  updateSliderFailure,
  updateSliderStart,
  updateSliderSuccess,
} from "./sliderSlice";
import {
  createCommentFailure,
  createCommentStart,
  createCommentSuccess,
  deleteCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  getChildrenFailure,
  getChildrenStart,
  getChildrenSuccess,
  getParentFailure,
  getParentStart,
  getParentSuccess,
} from "./commentSlice";
import {
  createNotificationFailure,
  createNotificationStart,
  createNotificationSuccess,
  getAllNotificationsFailure,
  getAllNotificationsStart,
  getAllNotificationsSuccess,
  updateNotificationFailure,
  updateNotificationStart,
  updateNotificationSuccess,
} from "./notificationSlice";
import {
  findMangasFailure,
  findMangasStart,
  findMangasSuccess,
  getAllGenresFailure,
  getAllGenresStart,
  getAllGenresSuccess,
  getAllMangasFailure,
  getAllMangasStart,
  getAllMangasSuccess,
  getAllNewMangasFailure,
  getAllNewMangasStart,
  getAllNewMangasSuccess,
  getAllRecentlyMangasFailure,
  getAllRecentlyMangasStart,
  getAllRecentlyMangasSuccess,
  getAllTrendingMangasFailure,
  getAllTrendingMangasStart,
  getAllTrendingMangasSuccess,
  getMangaFailure,
  getMangaStart,
  getMangaSuccess,
} from "./mangaSlice";
import {
  getChapterFailure,
  getChapterStart,
  getChapterSuccess,
} from "./chapterSlice";
import {
  getMangaByGenreFailure,
  getMangaByGenreStart,
  getMangaByGenreSuccess,
} from "./genreSlice";
import {
  createHistoryFailure,
  createHistoryStart,
  createHistorySuccess,
  getFullHistoryFailure,
  getFullHistoryStart,
  getFullHistorySuccess,
} from "./historySlice";
import {
  createFavouriteFailure,
  createFavouriteStart,
  createFavouriteSuccess,
  getFavouriteFailure,
  getFavouriteStart,
  getFavouriteSuccess,
} from "./favouriteSlice";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const REACT_APP_MANGA_URL = process.env.REACT_APP_MANGA_URL;

// Start genre

export const getAllGenres = async (dispatch) => {
  dispatch(getAllGenresStart());
  try {
    const res = await axios.get(`${REACT_APP_MANGA_URL}genres`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(getAllGenresSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    dispatch(getAllGenresFailure());
  }
};

export const getAllMangasBySpecficGenre = async (
  genreID,
  page,
  status = "",
  dispatch
) => {
  dispatch(getMangaByGenreStart());
  try {
    const res = await axios.get(
      `${REACT_APP_MANGA_URL}genres/${genreID}?page=${page}&status=${status}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(getMangaByGenreSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching manga by genre:", error);
    dispatch(getMangaByGenreFailure());
  }
};

export const getAllMangasByGenre = async (page, status = "", dispatch) => {
  dispatch(getMangaByGenreStart());
  try {
    const res = await axios.get(
      `${REACT_APP_MANGA_URL}genres/all?page=${page}&status=${status}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(getMangaByGenreSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching manga by genre:", error);
    dispatch(getMangaByGenreFailure());
  }
};

// End genre

// Start favourite

export const getFavourite = async (userID, accessToken, dispatch, axiosJWT) => {
  dispatch(getFavouriteStart());
  try {
    const res = await axiosJWT.get(
      `${REACT_APP_BASE_URL}favourite/find-all/${userID}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${accessToken}`,
        },
      }
    );
    dispatch(getFavouriteSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching favourite:", error);
    dispatch(getFavouriteFailure());
  }
};

export const createFavourite = async (
  userID,
  mangaID,
  accessToken,
  dispatch,
  axiosJWT
) => {
  dispatch(createFavouriteStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}favourite`,
      {
        userID,
        mangaID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${accessToken}`,
        },
      }
    );
    dispatch(createFavouriteSuccess(res.data));
  } catch (error) {
    dispatch(createFavouriteFailure());
    return false;
  }
};

// End favourite

// Start history

export const getHistory = async (userID, accessToken, dispatch, axiosJWT) => {
  dispatch(getFullHistoryStart());
  try {
    const res = await axiosJWT.get(
      `${REACT_APP_BASE_URL}history/find-all/${userID}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${accessToken}`,
        },
      }
    );
    dispatch(getFullHistorySuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    dispatch(getFullHistoryFailure());
  }
};

export const createHistory = async (
  userID,
  mangaID,
  accessToken,
  dispatch,
  axiosJWT
) => {
  dispatch(createHistoryStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}history`,
      {
        userID,
        mangaID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${accessToken}`,
        },
      }
    );
    dispatch(createHistorySuccess(res.data));
  } catch (error) {
    dispatch(createHistoryFailure());
    return false;
  }
};

// End history

// Start manga

export const searchSuggestMangas = async (keySearch, dispatch) => {
  dispatch(findMangasStart());
  try {
    const res = await axios.get(
      `${REACT_APP_MANGA_URL}search-suggest?q=${keySearch}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(findMangasSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching answer:", error);
    dispatch(findMangasFailure());
  }
};

export const searchMangas = async (keySearch, page, dispatch) => {
  dispatch(findMangasStart());
  try {
    const res = await axios.get(
      `${REACT_APP_MANGA_URL}search?q=${keySearch}&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(findMangasSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching answer:", error);
    dispatch(findMangasFailure());
  }
};

export const getManga = async (ID, dispatch) => {
  dispatch(getMangaStart());
  try {
    const res = await axios.get(`${REACT_APP_MANGA_URL}comics/${ID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(getMangaSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching answer:", error);
    dispatch(getMangaFailure());
  }
};

export const getAllMangas = async (type = "", page, status, dispatch) => {
  dispatch(getAllMangasStart());
  try {
    const res = await axios.get(
      `${REACT_APP_MANGA_URL}top${type}?page=${page}&status=${status}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(getAllMangasSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching answer:", error);
    dispatch(getAllMangasFailure());
  }
};

export const getAllTrendingMangas = async (page, status = "", dispatch) => {
  dispatch(getAllTrendingMangasStart());
  try {
    const res = await axios.get(
      `${REACT_APP_MANGA_URL}trending-comics?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(getAllTrendingMangasSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching answer:", error);
    dispatch(getAllTrendingMangasFailure());
  }
};

export const getAllNewMangas = async (page, status = "", dispatch) => {
  dispatch(getAllNewMangasStart());
  try {
    const res = await axios.get(
      `${REACT_APP_MANGA_URL}new-comics?page=${page}&status=${status}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(getAllNewMangasSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching answer:", error);
    dispatch(getAllNewMangasFailure());
  }
};

export const getAllRecentlyMangas = async (page, status = "", dispatch) => {
  dispatch(getAllRecentlyMangasStart());
  try {
    const res = await axios.get(
      `${REACT_APP_MANGA_URL}recent-update-comics?page=${page}&status=${status}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(getAllRecentlyMangasSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching answer:", error);
    dispatch(getAllRecentlyMangasFailure());
  }
};

// End manga

// Start chapter

export const getChapter = async (comicID, chapterID, dispatch) => {
  dispatch(getChapterStart());
  try {
    const res = await axios.get(
      `${REACT_APP_MANGA_URL}comics/${comicID}/chapters/${chapterID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(getChapterSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getChapterFailure());
  }
};

// End chapter

// Start user
export const signin = async (user, dispatch, navigate) => {
  dispatch(userSigninStart());
  try {
    const res = await axios.post(`${REACT_APP_BASE_URL}user/signin`, user);
    const refreshToken = res.data.metadata.tokens.refreshToken;
    localStorage.setItem("refreshToken", refreshToken);
    dispatch(userSigninSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(userSigninFailure());
    return false;
  }
};

export const signupAnotherWay = async (user, dispatch, navigate) => {
  dispatch(userSignupStart());
  try {
    const res = await axios.post(
      `${REACT_APP_BASE_URL}user/other-signup`,
      user
    );
    console.log("Res", res.data);
    const refreshToken = res.data?.metadata?.tokens?.refreshToken;
    localStorage.setItem("refreshToken", refreshToken);
    dispatch(userSignupSuccess());
    dispatch(userSigninSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(userSignupFailure());
    return false;
  }
};

export const signup = async (user, dispatch, navigate) => {
  dispatch(userSignupStart());
  try {
    const res = await axios.post(`${REACT_APP_BASE_URL}user/signup`, user);
    const refreshToken = res.data?.metadata?.metadata?.tokens?.refreshToken;
    localStorage.setItem("refreshToken", refreshToken);
    dispatch(userSignupSuccess());
    navigate("/signin");
  } catch (error) {
    dispatch(userSignupFailure());
    return false;
  }
};

export const logout = async (
  accessToken,
  userID,
  dispatch,
  navigate,
  axiosJWT
) => {
  dispatch(userLogoutStart());
  try {
    await axiosJWT.post(
      `${REACT_APP_BASE_URL}user/logout`,
      {},
      {
        headers: {
          authorization: accessToken,
          user: userID,
        },
      }
    );
    dispatch(userLogoutSuccess());
    navigate("/signin");
  } catch (error) {
    dispatch(userLogoutFailure());
  }
};

export const updateUser = async (
  accessToken,
  userID,
  data,
  dispatch,
  axiosJWT
) => {
  dispatch(updateUserStart());
  try {
    const result = await axiosJWT.post(
      `${REACT_APP_BASE_URL}user/update`,
      data,
      {
        headers: {
          authorization: accessToken,
          user: userID,
        },
      }
    );
    dispatch(updateUserSuccess());
    return result;
  } catch (error) {
    dispatch(updateUserFailure());
  }
};

export const appointAdmin = async (
  accessToken,
  userID,
  data,
  dispatch,
  axiosJWT
) => {
  dispatch(updateUserStart());
  try {
    const result = await axiosJWT.post(
      `${REACT_APP_BASE_URL}user/update`,
      data,
      {
        headers: {
          authorization: accessToken,
          user: userID,
        },
      }
    );
    dispatch(updateUserSuccess());
    return result;
  } catch (error) {
    dispatch(updateUserFailure());
  }
};

export const changePassword = async (
  accessToken,
  userID,
  data,
  dispatch,
  axiosJWT
) => {
  dispatch(changePasswordStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}user/change-password`,
      data,
      {
        headers: {
          authorization: accessToken,
          user: userID,
        },
      }
    );
    dispatch(changePasswordSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(changePasswordFailure());
  }
};

export const findUser = async (userID, dispatch) => {
  dispatch(findUserStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}user/find/${userID}`);
    dispatch(findUserSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(findUserFailure());
  }
};

export const findAllUser = async (keySearch = "", dispatch) => {
  dispatch(findAllUsersStart());
  try {
    const link = keySearch === "" ? "user" : `user?key=${keySearch}`;
    const res = await axios.get(`${REACT_APP_BASE_URL}${link}`);
    dispatch(findAllUsersSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(findAllUsersFailure());
  }
};

export const banUser = async (
  accessToken,
  userID,
  deleteID,
  dispatch,
  axiosJWT
) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete(`${REACT_APP_BASE_URL}user/${deleteID}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${accessToken}`,
        user: `${userID}`,
      },
    });
    dispatch(deleteUserSuccess());
    return res.data;
  } catch (error) {
    dispatch(deleteUserFailure());
    return false;
  }
};

// End user

// Upload
export const uploadImage = async (file, dispatch) => {
  const formData = new FormData();
  formData.append("file", file);
  dispatch(uploadImageStart());
  try {
    const res = await axios.post(
      `${REACT_APP_BASE_URL}upload/thumb-s3`,
      formData,
      {
        headers: {
          "Content-Type": "form-data",
        },
      }
    );
    dispatch(uploadImageSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(uploadImageFailure());
  }
};

// End upload

// Start slider

export const getSlider = async (ID, dispatch) => {
  dispatch(getSliderStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}slider/find/${ID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(getSliderSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching answer:", error);
    dispatch(getSliderFailure());
  }
};

export const getAllSliders = async (dispatch) => {
  dispatch(getAllSlidersStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}slider`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(getAllSlidersSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getAllSlidersFailure());
  }
};

export const getActiveSliders = async (dispatch) => {
  dispatch(getActiveSlidersStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}slider/find-active`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(getActiveSlidersSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getActiveSlidersFailure());
  }
};

export const getCollections = async (keySearch, dispatch) => {
  dispatch(getCollectionsStart());
  try {
    const link =
      keySearch === ""
        ? "slider/collection"
        : `slider/collection?key=${keySearch}`;
    const res = await axios.get(`${REACT_APP_BASE_URL}${link}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(getCollectionsSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getCollectionsFailure());
  }
};

export const getByCollections = async (collection, dispatch) => {
  dispatch(getByCollectionStart());
  try {
    const res = await axios.get(
      `${REACT_APP_BASE_URL}slider/collection/${collection}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(getByCollectionSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getByCollectionFailure());
  }
};

export const createSlider = async (
  accessToken,
  slider,
  dispatch,
  navigate,
  axiosJWT
) => {
  dispatch(createSliderStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}slider/create`,
      slider,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${accessToken}`,
        },
      }
    );
    dispatch(createSliderSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(createSliderFailure());
  }
};

export const updateSlider = async (
  accessToken,
  slider,
  dispatch,
  navigate,
  axiosJWT
) => {
  dispatch(updateSliderStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}slider/update`,
      slider,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${accessToken}`,
        },
      }
    );
    dispatch(updateSliderSuccess(res.data));
    navigate("/management/collection");
  } catch (error) {
    dispatch(updateSliderFailure());
  }
};

export const toggleSlider = async (
  accessToken,
  slider,
  dispatch,
  navigate,
  axiosJWT
) => {
  dispatch(toggleSliderStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}slider/toggle`,
      slider,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${accessToken}`,
        },
      }
    );
    dispatch(toggleSliderSuccess(res.data));
    getCollections(dispatch);
  } catch (error) {
    dispatch(toggleSliderFailure());
    return false;
  }
};

export const deleteSlider = async (accessToken, ID, dispatch, axiosJWT) => {
  dispatch(deleteSliderStart());
  try {
    await axiosJWT.delete(
      `${REACT_APP_BASE_URL}slider/${ID}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${accessToken}`,
        },
      }
    );
    dispatch(deleteSliderSuccess());
  } catch (error) {
    dispatch(deleteSliderFailure());
    return false;
  }
};

export const deleteCollection = async (
  accessToken,
  collection,
  dispatch,
  axiosJWT
) => {
  dispatch(deleteSliderStart());
  try {
    await axiosJWT.delete(
      `${REACT_APP_BASE_URL}slider/collection/${collection}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${accessToken}`,
        },
      }
    );
    dispatch(deleteSliderSuccess());
  } catch (error) {
    dispatch(deleteSliderFailure());
    return false;
  }
};

// End document

// Start comment

export const getComments = async (ID, dispatch) => {
  dispatch(getParentStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}comment/manga/${ID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(getParentSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching comment:", error);
    dispatch(getParentFailure());
  }
};

export const getReply = async (mangaID, commentID, dispatch) => {
  dispatch(getChildrenStart());
  try {
    const link = `comment?manga_id=${mangaID}&parent_comment_id=${commentID}`;
    const res = await axios.get(`${REACT_APP_BASE_URL}${link}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(getChildrenSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getChildrenFailure());
  }
};

export const createComment = async (
  accessToken,
  comment,
  dispatch,
  navigate,
  axiosJWT
) => {
  dispatch(createCommentStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}comment`, comment, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${accessToken}`,
      },
    });
    dispatch(createCommentSuccess(res.data));
  } catch (error) {
    dispatch(createCommentFailure());
  }
};

export const deleteComment = async (
  accessToken,
  userID,
  data,
  dispatch,
  axiosJWT
) => {
  dispatch(deleteCommentStart());
  try {
    await axiosJWT.delete(`${REACT_APP_BASE_URL}comment`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${accessToken}`,
        user: `${userID}`,
      },
      data: data,
    });
    dispatch(deleteCommentSuccess());
  } catch (error) {
    dispatch(deleteCommentFailure());
  }
};

// End comment

// Start notification

export const getNotifications = async (ID, dispatch) => {
  dispatch(getAllNotificationsStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}notification/${ID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(getAllNotificationsSuccess(res.data));
    return res.data;
  } catch (error) {
    console.error("Error fetching answer:", error);
    dispatch(getAllNotificationsFailure());
  }
};

export const createNotification = async (
  accessToken,
  notification,
  dispatch,
  axiosJWT
) => {
  dispatch(createNotificationStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}notification`,
      notification,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${accessToken}`,
        },
      }
    );
    dispatch(createNotificationSuccess(res.data));
  } catch (error) {
    dispatch(createNotificationFailure());
  }
};

export const markRead = async (
  accessToken,
  notification,
  dispatch,
  axiosJWT
) => {
  dispatch(updateNotificationStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}notification/mark-read`,
      notification,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${accessToken}`,
        },
      }
    );
    dispatch(updateNotificationSuccess(res.data));
  } catch (error) {
    dispatch(updateNotificationFailure());
  }
};
