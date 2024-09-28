import React, { useEffect, useState } from "react";
import { getFavourite, getManga } from "../../redux/apiRequest";
import {
  Box,
  Card,
  CardMedia,
  createTheme,
  Grid,
  Pagination,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import styles from "./Favourite.module.scss";
import classNames from "classnames/bind";
import { createAxios } from "../../createAxios";
import { useDispatch, useSelector } from "react-redux";
import { MenuBook, PersonAdd, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CONSTANT from "../../constants";

const cx = classNames.bind(styles);

const Favourite = () => {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const axiosJWT = createAxios(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const { fallbackImage } = CONSTANT;

  const [mangas, setMangas] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const favouriteData = await getFavourite(
        userID,
        accessToken,
        dispatch,
        axiosJWT
      );

      if (favouriteData.metadata && favouriteData.metadata.length > 0) {
        const mangaPromises = favouriteData.metadata.map(
          async (favourite) =>
            await getManga(favourite.favourite_manga_id, dispatch)
        );

        const mangaResults = await Promise.all(mangaPromises);
        setMangas(mangaResults);
        console.log("MR", mangaResults);
      }
      setLoading(false);
    };

    if (currentUser) fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        marginTop={isMobile || isTablet ? 28 : 0}
        sx={{ padding: isMobile || isTablet ? "20px" : "0 60px" }}
      >
        <Grid container spacing={2}>
          {/* Skeleton for Manga Card Thumbnails */}
          {Array.from(new Array(8)).map((_, index) => (
            <Grid item xs={6} sm={6} md={3} lg={1.5} key={index}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={250}
                sx={{ backgroundColor: "var(--green)" }}
              />
              <Skeleton
                variant="text"
                sx={{ backgroundColor: "var(--green)", mt: 1 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                sx={{ backgroundColor: "var(--green)" }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box
      className={cx("home-container")}
      sx={{ padding: isMobile || isTablet ? "20px" : "60px" }}
      position="relative"
    >
      <h2>Favourite</h2>
      <Grid container spacing={2}>
        {mangas?.map((manga, index) => (
          <Grid item xs={6} sm={6} md={3} lg={1.714} key={index}>
            <Card
              onClick={async () => {
                await getManga(manga?.id, dispatch);
                navigate(`/manga/${manga?.id}`);
              }}
              className={cx("manga-card")}
              sx={{
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 3,
                },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={manga?.thumbnail || fallbackImage}
                alt={manga?.title}
                className={cx("card-media")}
              />
              <Box className={cx("overlay")}>
                <Typography className={cx("title")}>{manga?.title}</Typography>
                <Box className={cx("info")}>
                  <Box className={cx("info-item")}>
                    <PersonAdd sx={{ fontSize: "16px", marginRight: "4px" }} />
                    <Typography sx={{ fontSize: "14px" }}>
                      {manga?.followers}
                    </Typography>
                  </Box>
                  <Box className={cx("info-item")}>
                    <Visibility sx={{ fontSize: "16px", marginRight: "4px" }} />
                    <Typography sx={{ fontSize: "14px" }}>
                      {manga?.total_views}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {mangas.length > 16 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            sx={{
              "& .MuiPaginationItem-root": {
                backgroundColor: "var(--black)",
                color: "var(--green)",
              },
              "& .Mui-selected": {
                backgroundColor: "var(--green)",
                color: "var(--white)",
              },
            }}
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Favourite;
