import React from "react";
import { getAllNewMangas } from "../../redux/apiRequest";
import { Box } from "@mui/material";
import styles from "./New.module.scss";
import classNames from "classnames/bind";
import MangaSection from "../MangaSection";

const cx = classNames.bind(styles);

const New = () => {
  return (
    <Box className={cx("home-container")} padding={6} position="relative">
      <MangaSection
        sectionName={"New Manga"}
        fetchMangaFunction={getAllNewMangas}
      />
    </Box>
  );
};

export default New;
