import React from "react";
import { getAllMangasBySpecficGenre } from "../../redux/apiRequest";
import { Box } from "@mui/material";
import styles from "./Genres.module.scss";
import classNames from "classnames/bind";
import MangaSectionGenres from "../MangaSectionGenres";

const cx = classNames.bind(styles);

const Genres = () => {
  return (
    <Box className={cx("home-container")} padding={6} position="relative">
      <MangaSectionGenres fetchMangaFunction={getAllMangasBySpecficGenre} />
    </Box>
  );
};

export default Genres;
