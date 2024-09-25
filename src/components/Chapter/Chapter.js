import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Skeleton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getChapter } from "../../redux/apiRequest";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Chapter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug, chapter } = useParams();
  const [currentChapter, setCurrentChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getChapter(slug, chapter.split("-")[1], dispatch);
      console.log("Chapter", res);
      setCurrentChapter(res);
      setLoading(false);
    };
    fetchData();
  }, [slug, chapter, dispatch]);

  const skeletonItems = Array.from({ length: 5 }).map((_, index) => (
    <Skeleton
      key={index}
      variant="rectangular"
      width="100%"
      height={400}
      sx={{ marginBottom: "20px", backgroundColor: "var(--green)" }}
    />
  ));

  if (loading) {
    return (
      <Box
        sx={{
          padding: "20px 50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Skeleton
          sx={{ backgroundColor: "var(--green)", mb: 2 }}
          variant="text"
          width={300}
          height={40}
        />
        <Skeleton
          sx={{ backgroundColor: "var(--green)", mb: 2 }}
          variant="text"
          width={200}
          height={30}
        />
        <Box sx={{ width: "100%" }}>{skeletonItems}</Box>
      </Box>
    );
  }

  if (!currentChapter) {
    return <Typography>Không tìm thấy dữ liệu chapter.</Typography>;
  }

  const { comic_name, chapter_name, images, chapters } = currentChapter;

  const currentIndex = chapters.findIndex(
    (ch) => ch.id === parseInt(chapter.split("-")[1])
  );

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectChapter = (chapterId) => {
    handleCloseMenu();
    navigate(`/manga/${slug}/chap-${chapterId}`);
  };

  return (
    <Box
      sx={{
        padding: "20px 50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link to={`/manga/${slug}`} style={{ textDecoration: "none" }}>
        <Typography
          textAlign={"center"}
          variant="h4"
          fontWeight="bold"
          sx={{ color: "var(--white)", "&:hover": { color: "var(--yellow)" } }}
        >
          {comic_name}
        </Typography>
      </Link>

      <Typography
        sx={{ color: "var(--white)" }}
        textAlign={"center"}
        variant="h6"
        fontWeight="bold"
      >
        {chapter_name}
      </Typography>

      <Box sx={{ marginTop: "20px" }}>
        {images.length > 0 ? (
          images?.map((image, index) => (
            <Box
              xs={24}
              key={index}
              sx={{ textAlign: "center", marginBottom: "20px" }}
            >
              <img
                src={`${image.src}`}
                alt={`Page ${image.page}`}
                style={{ maxWidth: "100%" }}
              />
            </Box>
          ))
        ) : (
          <h1>Chapter is not available</h1>
        )}
      </Box>

      {/* Chapter Navigation */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}
      >
        {currentIndex < chapters.length - 1 && (
          <Button
            onClick={() =>
              navigate(`/manga/${slug}/chap-${chapters[currentIndex + 1].id}`)
            }
            sx={{
              backgroundColor: "var(--green)",
              color: "var(--black)",
              fontWeight: "600",
              "&:hover": {
                color: "var(--green)",
                backgroundColor: "var(--black)",
                border: "1px solid var(--green)",
              },
            }}
          >
            Prev
          </Button>
        )}

        <Button
          sx={{
            backgroundColor: "var(--green)",
            color: "var(--black)",
            minWidth: "200px",
            margin: "0 16px",
            fontWeight: "600",
            "&:hover": {
              color: "var(--green)",
              backgroundColor: "var(--black)",
              border: "1px solid var(--green)",
            },
          }}
          onClick={handleOpenMenu}
        >
          {chapter_name}
        </Button>

        {currentIndex > 0 && (
          <Button
            onClick={() =>
              navigate(`/manga/${slug}/chap-${chapters[currentIndex - 1].id}`)
            }
            sx={{
              backgroundColor: "var(--green)",
              color: "var(--black)",
              fontWeight: "600",
              "&:hover": {
                color: "var(--green)",
                backgroundColor: "var(--black)",
                border: "1px solid var(--green)",
              },
            }}
          >
            Next
          </Button>
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        sx={{
          "& .MuiMenu-paper": {
            backgroundColor: "var(--green)",
            borderRadius: "8px",
          },
        }}
      >
        {chapters.map((ch) => (
          <MenuItem
            key={ch.id}
            onClick={() => handleSelectChapter(ch.id)}
            sx={{
              "&:hover": {
                backgroundColor: "var(--light-gray)",
              },
              fontFamily: "var(--font-family)",
            }}
          >
            <ListItemIcon>
              <ArrowForwardIcon fontSize="small" />
            </ListItemIcon>
            {ch.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default Chapter;
