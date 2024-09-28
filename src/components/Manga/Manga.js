import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  CardMedia,
  Button,
  IconButton,
  Skeleton,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { createAxios } from "../../createAxios";
import {
  createFavourite,
  createHistory,
  getManga,
} from "../../redux/apiRequest";
import CONSTANTS from "../../constants";
import { MenuBook } from "@mui/icons-material";

function Manga() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const axiosJWT = createAxios(currentUser);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const { fallbackMangaInfo, fallbackImage } = CONSTANTS;

  const handleFavourite = () => {
    createFavourite(userID, slug, accessToken, dispatch, axiosJWT);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getManga(slug, dispatch);
      setLoading(false);
    };
    fetchData();

    if (currentUser) {
      createHistory(userID, slug, accessToken, dispatch, axiosJWT);
    }
  }, [slug]);

  const currentManga = useSelector((state) => state.manga.get.manga);
  console.log(currentManga);
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  if (loading) {
    return (
      <Container>
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Skeleton for Thumbnail */}
          <Grid item xs={12} sm={3}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={360}
              sx={{ backgroundColor: "var(--green)" }}
            />
          </Grid>

          {/* Skeleton for Info Section */}
          <Grid item xs={12} sm={9}>
            <Box display="flex" flexDirection="column" height="100%">
              <Skeleton
                variant="text"
                width="40%"
                height={40}
                sx={{ backgroundColor: "var(--green)" }}
              />
              <Skeleton
                variant="text"
                width="70%"
                height={60}
                sx={{ backgroundColor: "var(--green)" }}
              />
              <Box mt={2}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={40}
                  sx={{ backgroundColor: "var(--green)" }}
                />
              </Box>
              <Box mt={2} display="flex" alignItems="center">
                <Skeleton
                  variant="text"
                  width="20%"
                  height={30}
                  sx={{ backgroundColor: "var(--green)" }}
                />
                <Skeleton
                  variant="text"
                  width="20%"
                  height={30}
                  sx={{ backgroundColor: "var(--green)", ml: 2 }}
                />
              </Box>
              <Skeleton
                variant="text"
                width="50%"
                height={30}
                sx={{ backgroundColor: "var(--green)", mt: 2 }}
              />
            </Box>
          </Grid>

          {/* Skeleton for Chapters Section */}
          <Grid item xs={12} sm={12}>
            <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
              {Array.from(new Array(5)).map((_, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={50}
                    sx={{ backgroundColor: "var(--green)" }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!currentManga) {
    return <Typography>Không tìm thấy dữ liệu chapter.</Typography>;
  }

  const renderRating = (rating) => {
    const hearts = [];
    for (let i = 0; i < 10; i++) {
      hearts.push(
        <FavoriteIcon
          key={i}
          sx={{
            color: i < rating ? "var(--yellow)" : "lightgray",
            fontSize: "20px",
          }}
        />
      );
    }
    return hearts;
  };

  const {
    authors,
    chapters,
    description,
    followers,
    genres,
    rate,
    id,
    status,
    thumbnail,
    title,
    total_views,
    total_vote,
  } = currentManga;

  return (
    <Container>
      <Grid container spacing={4} sx={{ marginTop: isMobile ? 0 : 4 }}>
        {/* Thumbnail */}
        <Grid
          sx={{
            display: isMobile ? "flex" : "unset",
            justifyContent: "center",
          }}
          item
          xs={12}
          sm={3}
        >
          <CardMedia
            component="img"
            image={
              thumbnail ||
              fallbackImage
            }
            alt={title}
            sx={{
              borderRadius: 2,
              width: "auto",
              maxWidth: "100%",
              height: "360px",
              objectFit: "cover",
            }}
          />
        </Grid>

        {/* Info Section */}
        <Grid item xs={12} sm={9}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <Box>
              <Typography
                sx={{ color: "var(--white)", fontFamily: "var(--font-family)" }}
                variant="subtitle1"
              >
                {authors}
              </Typography>
              <Typography
                sx={{ color: "var(--white)", fontFamily: "var(--font-family)" }}
                variant="h4"
              >
                {title}
              </Typography>

              {/* Genres Buttons */}
              <Box mt={1}>
                {genres.map((genre, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      navigate(`/genres/${genre.id}`);
                    }}
                    sx={{
                      marginRight: 1,
                      marginTop: 1,
                      color: "var(--black)",
                      padding: "4px 8px",
                      fontSize: "12px",
                      backgroundColor: "var(--green)",
                      fontWeight: "600",
                      fontFamily: "var(--font-family)",
                      borderColor: "1px solid var(--black)",
                      "&:hover": {
                        color: "var(--green)",
                        backgroundColor: "var(--black)",
                        border: "1px solid var(--green)",
                      },
                    }}
                  >
                    {genre.name}
                  </Button>
                ))}
              </Box>

              <Box mt={1} sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "12px",
                  }}
                >
                  <VisibilityIcon
                    sx={{ color: "var(--white)", marginRight: "4px" }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "var(--white)",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    {total_views}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "12px",
                  }}
                >
                  <ThumbUpIcon
                    sx={{ color: "var(--white)", marginRight: "4px" }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "var(--white)",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    {total_vote}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "12px",
                  }}
                >
                  <PeopleIcon
                    sx={{ color: "var(--white)", marginRight: "4px" }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "var(--white)",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    {followers}
                  </Typography>
                </Box>
              </Box>
              {rate && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {renderRating(rate)}
                </Box>
              )}
              <Typography
                sx={{
                  color: "var(--white)",
                  fontFamily: "var(--font-family)",
                }}
                variant="subtitle1"
              >
                Tình trạng: {status}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "var(--white)",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: isExpanded ? "none" : 2,
                  WebkitBoxOrient: "vertical",
                }}
                variant="body1"
              >
                {description}
              </Typography>
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{
                  color: "var(--green)",
                  marginTop: 1,
                  textTransform: "none",
                  display: isExpanded ? "none" : "inline",
                }}
              >
                Expand
              </Button>
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{
                  color: "var(--green)",
                  marginTop: 1,
                  textTransform: "none",
                  display: isExpanded ? "inline" : "none",
                }}
              >
                Collapse
              </Button>
            </Box>
            <Box display="flex" alignItems="center" marginTop={2}>
              {currentUser ? (
                <Button
                  variant="contained"
                  onClick={handleFavourite}
                  endIcon={<SaveIcon />}
                  sx={{
                    marginTop: "10px",
                    backgroundColor: "var(--green)",
                    fontFamily: "var(--font-family)",
                    "&:hover": {
                      backgroundColor: "var(--yellow)",
                    },
                  }}
                >
                  Favourite
                </Button>
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Grid>

        {/* Chapters Section */}
        <Grid item xs={12} sm={12}>
          <Box
            display="flex"
            flexDirection="column"
            sx={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {chapters.map((chapter, index) => (
              <Box
                key={index}
                sx={{ flex: "0 0 100%", marginBottom: 1, overflow: "hidden" }}
              >
                <Box
                  sx={{
                    whiteSpace: "nowrap",
                    flexGrow: 1,
                    maxWidth: "100%",
                  }}
                >
                  <Button
                    fullWidth
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      backgroundColor: "var(--grey)",
                      color: "var(--green)",
                      fontSize: "14px",
                      padding: "0 10px",
                      fontWeight: "500",
                      fontFamily: "var(--font-family)",
                    }}
                    onClick={() => {
                      const chapterID = chapter.name.split(" ")[1];
                      navigate(`chap-${chapterID}`);
                    }}
                  >
                    <span
                      style={{
                        width: "80%",
                        textAlign: "left",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {chapter.name}
                    </span>
                    <IconButton onClick={() => {}} sx={{ marginLeft: 1 }}>
                      <MenuBook sx={{ color: "var(--green)" }} />
                    </IconButton>
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Manga;
