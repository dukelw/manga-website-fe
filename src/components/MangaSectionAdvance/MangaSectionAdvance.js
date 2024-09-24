import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  Grid,
  Typography,
  CircularProgress,
  Pagination,
  Button,
} from "@mui/material";
import { MenuBook, Visibility } from "@mui/icons-material"; // Import icons
import styles from "./MangaSectionAdvance.module.scss";
import classNames from "classnames/bind";
import { getManga } from "../../redux/apiRequest";

const cx = classNames.bind(styles);

const MangaSectionAdvance = ({ sectionName, fetchMangaFunction }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("");
  const [mangas, setMangas] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetchMangaFunction(
          type,
          currentPage,
          status,
          dispatch
        );
        setMangas(res.comics);
        setTotalPages(res.total_pages);
      } catch (error) {
        console.error("Error fetching mangas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, status, currentPage, dispatch]); // Re-fetch data when type, status, or currentPage changes

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setCurrentPage(1); // Reset to the first page when type changes
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
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={cx("home-container")} padding={6} position="relative">
      {/* Type buttons */}
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant={type === "" ? "contained" : "outlined"}
              onClick={() => handleTypeChange("")}
              sx={{
                backgroundColor: type === "" ? "var(--green)" : "var(--black)",
                color: type === "" ? "var(--black)" : "var(--green)",
                fontWeight: "600",
                maxWidth: "200px",
                borderColor: "var(--green)",
                fontFamily: "var(--font-family)",
                "&:hover": {
                  color: "var(--black)",
                  backgroundColor: "var(--green)",
                  border: "1px solid var(--green)",
                },
              }}
            >
              All
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={type === "/daily" ? "contained" : "outlined"}
              sx={{
                backgroundColor:
                  type === "/daily" ? "var(--green)" : "var(--black)",
                color: type === "/daily" ? "var(--black)" : "var(--green)",
                fontWeight: "600",
                maxWidth: "200px",
                borderColor: "var(--green)",
                fontFamily: "var(--font-family)",
                "&:hover": {
                  color: "var(--black)",
                  backgroundColor: "var(--green)",
                  border: "1px solid var(--green)",
                },
              }}
              onClick={() => handleTypeChange("/daily")}
            >
              Daily
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={type === "/monthly" ? "contained" : "outlined"}
              sx={{
                backgroundColor:
                  type === "/monthly" ? "var(--green)" : "var(--black)",
                color: type === "/monthly" ? "var(--black)" : "var(--green)",
                fontWeight: "600",
                maxWidth: "200px",
                borderColor: "var(--green)",
                fontFamily: "var(--font-family)",
                "&:hover": {
                  color: "var(--black)",
                  backgroundColor: "var(--green)",
                  border: "1px solid var(--green)",
                },
              }}
              onClick={() => handleTypeChange("/monthly")}
            >
              Monthly
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={type === "/weekly" ? "contained" : "outlined"}
              sx={{
                backgroundColor:
                  type === "/weekly" ? "var(--green)" : "var(--black)",
                color: type === "/weekly" ? "var(--black)" : "var(--green)",
                fontWeight: "600",
                maxWidth: "200px",
                borderColor: "var(--green)",
                fontFamily: "var(--font-family)",
                "&:hover": {
                  color: "var(--black)",
                  backgroundColor: "var(--green)",
                  border: "1px solid var(--green)",
                },
              }}
              onClick={() => handleTypeChange("/weekly")}
            >
              Weekly
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={type === "/chapter" ? "contained" : "outlined"}
              sx={{
                backgroundColor:
                  type === "/chapter" ? "var(--green)" : "var(--black)",
                color: type === "/chapter" ? "var(--black)" : "var(--green)",
                fontWeight: "600",
                maxWidth: "200px",
                borderColor: "var(--green)",
                fontFamily: "var(--font-family)",
                "&:hover": {
                  color: "var(--black)",
                  backgroundColor: "var(--green)",
                  border: "1px solid var(--green)",
                },
              }}
              onClick={() => handleTypeChange("/chapter")}
            >
              Chapter
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={type === "/follow" ? "contained" : "outlined"}
              sx={{
                backgroundColor:
                  type === "/follow" ? "var(--green)" : "var(--black)",
                color: type === "/follow" ? "var(--black)" : "var(--green)",
                fontWeight: "600",
                maxWidth: "200px",
                borderColor: "var(--green)",
                fontFamily: "var(--font-family)",
                "&:hover": {
                  color: "var(--black)",
                  backgroundColor: "var(--green)",
                  border: "1px solid var(--green)",
                },
              }}
              onClick={() => handleTypeChange("/follow")}
            >
              Follow
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={type === "/comment" ? "contained" : "outlined"}
              sx={{
                backgroundColor:
                  type === "/comment" ? "var(--green)" : "var(--black)",
                color: type === "/comment" ? "var(--black)" : "var(--green)",
                fontWeight: "600",
                maxWidth: "200px",
                borderColor: "var(--green)",
                fontFamily: "var(--font-family)",
                "&:hover": {
                  color: "var(--black)",
                  backgroundColor: "var(--green)",
                  border: "1px solid var(--green)",
                },
              }}
              onClick={() => handleTypeChange("/comment")}
            >
              Comment
            </Button>
          </Grid>
        </Grid>
      </Box>

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
        {sectionName}
      </Typography>

      <Grid container spacing={2}>
        {mangas.map((manga) => (
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
                      {manga.last_chapters[0]?.name}
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

export default MangaSectionAdvance;
