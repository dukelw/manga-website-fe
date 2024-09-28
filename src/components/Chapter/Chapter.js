import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Skeleton,
  Badge,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getChapter, markRead } from "../../redux/apiRequest";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CommentSection from "../CommentSection";
import { Drawer, IconButton } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { createAxios } from "../../createAxios";
import io from "socket.io-client";
import CONSTANT from "../../constants/index";

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function Chapter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug, chapter } = useParams();
  const [currentChapter, setCurrentChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const [openCommentDrawer, setOpenCommentDrawer] = useState(false);
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const axiosJWT = createAxios(currentUser);
  const { fallbackMangaChapter } = CONSTANT;

  const toggleCommentDrawer = () => {
    setOpenCommentDrawer((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (currentUser) {
        const notification = {
          mangaID: slug + "_" + chapter,
          userID,
        };
        await markRead(accessToken, notification, dispatch, axiosJWT);
        await socket.emit("update_notification", { user_id: userID });
      }
      const res = await getChapter(slug, chapter.split("-")[1], dispatch);
      if (res) {
        setCurrentChapter(res);
      } else {
        setCurrentChapter(fallbackMangaChapter);
      }
      setLoading(false);
    };
    fetchData();
  }, [slug, chapter, dispatch]);

  useEffect(() => {
    socket.emit("join_room", slug + "_" + chapter);
    socket.emit("get_comment", slug + "_" + chapter);
    socket.on("change_comment", async (data) => {
      setCommentCount(data);
    });
  }, [socket]);

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
      <IconButton
        onClick={toggleCommentDrawer}
        sx={{
          position: "fixed",
          left: "20px",
          bottom: "20px",
          backgroundColor: "var(--green)",
          color: "var(--black)",
          "&:hover": {
            backgroundColor: "var(--black)",
            color: "var(--green)",
          },
        }}
      >
        <Badge badgeContent={commentCount} color="error">
          <CommentIcon />
        </Badge>
      </IconButton>
      <Drawer
        anchor="left"
        open={openCommentDrawer}
        onClose={toggleCommentDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "var(--black)",
            width: "300px",
            padding: "20px",
          },
        }}
      >
        <CommentSection mangaID={slug + "_" + chapter} />
      </Drawer>
    </Box>
  );
}

export default Chapter;
