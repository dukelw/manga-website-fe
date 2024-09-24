import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  CardMedia,
  Button,
  IconButton,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Manga() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentManga = useSelector((state) => state?.manga.get.manga);
  console.log(currentManga);

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
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {/* Thumbnail */}
        <Grid item xs={12} sm={3}>
          <CardMedia
            component="img"
            image={thumbnail}
            alt={title}
            sx={{ borderRadius: 2, width: "auto", height: "360px" }}
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
                      navigate(`chap-${genre.id}`);
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {renderRating(rate)}
              </Box>
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
            <Button
              onClick={() => {
                navigate(`chap-${1}`);
              }}
              variant="outlined"
              sx={{
                marginTop: 2,
                backgroundColor: "var(--green)",
                color: "var(--black)",
                fontWeight: "600",
                maxWidth: "200px",
                "&:hover": {
                  color: "var(--green)",
                  backgroundColor: "var(--black)",
                  border: "1px solid var(--green)",
                },
              }}
            >
              Read Now
            </Button>
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
                    <IconButton
                      onClick={() => {
                        /* Hàm xử lý lưu ở đây */
                      }}
                      sx={{ marginLeft: 1 }}
                    >
                      <SaveIcon sx={{ color: "var(--green)" }} />
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
