import React from "react";
import { getAllMangas } from "../../redux/apiRequest";
import { Box } from "@mui/material";
import styles from "./Popular.module.scss";
import classNames from "classnames/bind";
import MangaSectionAdvance from "../MangaSectionAdvance";

const cx = classNames.bind(styles);

const Popular = () => {

  return (
    <Box
      className={cx("home-container")}
      sx={{ padding: "10px" }}
      position="relative"
    >
      <MangaSectionAdvance
        sectionName={"Top Mangas"}
        fetchMangaFunction={getAllMangas}
      />
    </Box>
  );
};

export default Popular;
