import React, { useEffect, useState } from "react";
import {
  getAllTrendingMangas,
  getAllRecentlyMangas,
  getAllNewMangas,
} from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import MangaSection from "../MangaSection";

const cx = classNames.bind(styles);

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [dispatch]);

  return (
    <Box className={cx("home-container")} padding={6} position="relative">
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
