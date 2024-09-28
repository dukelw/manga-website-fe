import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  Grid,
  Typography,
  CircularProgress,
  Pagination,
  Button,
  Skeleton,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { MenuBook, Visibility } from "@mui/icons-material"; // Import icons
import styles from "./SpecificGenre.module.scss";
import classNames from "classnames/bind";
import { getAllMangasBySpecficGenre, getManga } from "../../redux/apiRequest";

const cx = classNames.bind(styles);

const SpecificGenre = () => {
  const { genreID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [mangas, setMangas] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllMangasBySpecficGenre(
          genreID,
          currentPage,
          status,
          dispatch
        );
        console.log(res);
        setMangas(res.comics);
        setTotalPages(res.total_pages);
      } catch (error) {
        console.error("Error fetching mangas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genreID, status, currentPage, dispatch]); // Re-fetch data when type, status, or currentPage changes

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setCurrentPage(1); // Reset to the first page when status changes
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ padding: isMobile || isTablet ? "20px" : "60px" }}
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
    <Box className={cx("home-container")} padding={6} position="relative">
      {/* Status buttons */}
      <Grid container spacing={2} mb={2}>
        <Grid item>
          <Button
            variant={status === "all" ? "contained" : "outlined"}
            onClick={() => handleStatusChange("all")}
            sx={{
              backgroundColor:
                status === "all" ? "var(--green)" : "var(--black)",
              color: status === "all" ? "var(--black)" : "var(--green)",
              borderColor: "var(--green)",
              fontWeight: "600",
              fontFamily: "var(--font-family)",
              "&:hover": {
                backgroundColor:
                  status === "all" ? "var(--green)" : "var(--black)",
                color: status === "all" ? "var(--black)" : "var(--green)",
                border: "1px solid var(--green)",
              },
            }}
          >
            All
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={status === "completed" ? "contained" : "outlined"}
            onClick={() => handleStatusChange("completed")}
            sx={{
              backgroundColor:
                status === "completed" ? "var(--green)" : "var(--black)",
              color: status === "completed" ? "var(--black)" : "var(--green)",
              borderColor: "var(--green)",
              fontWeight: "600",
              fontFamily: "var(--font-family)",
              "&:hover": {
                backgroundColor:
                  status === "completed" ? "var(--green)" : "var(--black)",
                color: status === "completed" ? "var(--black)" : "var(--green)",
                border: "1px solid var(--green)",
              },
            }}
          >
            Completed
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={status === "ongoing" ? "contained" : "outlined"}
            onClick={() => handleStatusChange("ongoing")}
            sx={{
              backgroundColor:
                status === "ongoing" ? "var(--green)" : "var(--black)",
              color: status === "ongoing" ? "var(--black)" : "var(--green)",
              borderColor: "var(--green)",
              fontWeight: "600",
              fontFamily: "var(--font-family)",
              "&:hover": {
                backgroundColor:
                  status === "ongoing" ? "var(--green)" : "var(--black)",
                color: status === "ongoing" ? "var(--black)" : "var(--green)",
                border: "1px solid var(--green)",
              },
            }}
          >
            Ongoing
          </Button>
        </Grid>
      </Grid>

      {/* Manga cards */}
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
        {genreID.toLocaleUpperCase()}
      </Typography>

      <Grid container spacing={2}>
        {mangas.map((manga) => (
          <Grid item xs={6} sm={6} md={3} lg={1.714} key={manga.id}>
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
                        ? manga.last_chapters[0]?.name
                        : manga.lastest_chapters[0]?.name}
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

      {/* Pagination */}
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
    </Box>
  );
};

export default SpecificGenre;
