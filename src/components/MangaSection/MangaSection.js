import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  Grid,
  Typography,
  Pagination,
  Skeleton,
} from "@mui/material";
import { MenuBook, Visibility } from "@mui/icons-material"; // Import icons
import styles from "./MangaSection.module.scss";
import classNames from "classnames/bind";
import { getManga } from "../../redux/apiRequest";
import CONSTANTS from "../../constants";

const cx = classNames.bind(styles);

const MangaSection = ({ sectionName, fetchMangaFunction }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [mangas, setMangas] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { fallbackManga } = CONSTANTS;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res = await fetchMangaFunction(currentPage, "", dispatch);
        console.log(res);
        if (!res) {
          res = fallbackManga;
        }
        setMangas(res.comics);
        setTotalPages(res.total_pages);
      } catch (error) {
        console.error("Error fetching mangas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Grid container spacing={2}>
          {/* Skeleton for Manga Card Thumbnails */}
          {Array.from(new Array(8)).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} lg={1.5} key={index}>
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
    <Box className={cx("home-container")} padding={6} position="relative">
      <Typography
        variant="h5"
        component="h5"
        gutterBottom
        sx={{
          fontFamily: "var(--font-family)",
          fontWeight: "bold",
          marginBottom: "12px",
        }}
      >
        {sectionName}
      </Typography>

      <Grid container spacing={2}>
        {mangas?.map((manga) => (
          <Grid item xs={12} sm={6} md={3} lg={1.5} key={manga.id}>
            <Card
              onClick={async () => {
                await getManga(manga.id, dispatch);
                navigate(`/manga/${manga.id}`);
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
                image={manga.thumbnail}
                alt={manga.title}
                className={cx("card-media")}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://itphutran.com/wp-content/uploads/2017/05/H%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-x%E1%BB%AD-l%C3%BD-l%E1%BB%97i-404-Page-Not-Found-trong-Java-v%C3%A0-PHP.jpg";
                }}
              />
              <Box className={cx("overlay")}>
                <Typography className={cx("title")}>{manga.title}</Typography>
                <Box className={cx("info")}>
                  <Box className={cx("info-item")}>
                    <MenuBook sx={{ fontSize: "16px", marginRight: "4px" }} />
                    <Typography sx={{ fontSize: "14px" }}>
                      {manga.last_chapters
                        ? manga?.last_chapters[0]?.name
                        : manga?.lastest_chapters[0].name}
                    </Typography>
                  </Box>
                  <Box className={cx("info-item")}>
                    <Visibility sx={{ fontSize: "16px", marginRight: "4px" }} />
                    <Typography sx={{ fontSize: "14px" }}>
                      {manga.total_views}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          sx={{
            "& .MuiPaginationItem-root": {
              backgroundColor: "var(--black)",
              color: "var(--yellow)",
            },
            "& .Mui-selected": {
              backgroundColor: "var(--yellow)",
              color: "var(--white)",
            },
          }}
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default MangaSection;
