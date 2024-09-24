import React from "react";
import { getAllMangasByGenre } from "../../redux/apiRequest";
import { Box } from "@mui/material";
import styles from "./Genres.module.scss";
import classNames from "classnames/bind";
import MangaSection from "../MangaSection";

const cx = classNames.bind(styles);

const Genres = () => {
  return (
    <Box className={cx("home-container")} padding={6} position="relative">
      <MangaSection
        sectionName={"All Genres"}
        fetchMangaFunction={getAllMangasByGenre}
      />
    </Box>
  );
};

export default Genres;
