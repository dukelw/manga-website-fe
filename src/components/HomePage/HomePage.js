import React from "react";
import {
  getAllTrendingMangas,
  getAllRecentlyMangas,
  getAllNewMangas,
} from "../../redux/apiRequest";
import { Box } from "@mui/material";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import MangaSection from "../MangaSection";
import Slider from "../../layouts/components/Slider";

const cx = classNames.bind(styles);

const HomePage = () => {
  return (
    <Box className={cx("home-container")} position="relative">
      <Slider />
      <MangaSection
        sectionName={"Recently Updated"}
        fetchMangaFunction={getAllRecentlyMangas}
      />
      <MangaSection
        sectionName={"Popular"}
        fetchMangaFunction={getAllTrendingMangas}
      />
      <MangaSection sectionName={"New"} fetchMangaFunction={getAllNewMangas} />
    </Box>
  );
};

export default HomePage;
