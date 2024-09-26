import { useEffect, useState, memo, useCallback } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  CircularProgress,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment, getComments } from "../../redux/apiRequest";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import io from "socket.io-client";
import { createAxios } from "../../createAxios";
import moment from "moment";

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);
const timeFromNow = (createdAt) => {
  const now = moment();
  const created = moment(createdAt);
  const diffSeconds = now.diff(created, "seconds");
  const diffMinutes = now.diff(created, "minutes");
  const diffHours = now.diff(created, "hours");
  const diffDays = now.diff(created, "days");

  if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return created.format("DD/MM/YYYY HH:mm");
};

const CommentSection = ({
  comment,
  onReplySubmit,
  onDeleteComment,
  mangaID,
  onDeleteReply,
}) => {
  const [replyVisible, setReplyVisible] = useState(false);
  const [replyText, setReplyText] = useState("");
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const userID = currentUser?.metadata.user._id;
  const isAdmin = currentUser?.metadata.user.isAdmin;

  const handleReplyClick = () => {
    setReplyVisible(!replyVisible);
  };

  const handleReplySubmit = () => {
    onReplySubmit(comment._id, replyText);
    setReplyText("");
  };

  return (
    <Box sx={{ mb: 2, pl: 2, borderLeft: "2px solid var(--white)" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <img
          src={comment.comment_user.user_avatar}
          alt="avatar"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            marginRight: "8px",
          }}
        />
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
              color: "var(--white)",
            }}
          >
            {comment.comment_user.user_name}
          </Typography>
          <Typography variant="caption" sx={{ color: "var(--green)" }}>
            {timeFromNow(comment.createdAt)}
          </Typography>
        </Box>
      </Box>

      {comment.comment_parent_id && (
        <Typography
          variant="body2"
          sx={{ fontStyle: "italic", color: "var(--white)", mb: 1 }}
        >
          Replied to {comment.comment_parent_user_name}
        </Typography>
      )}

      <Typography sx={{ color: "var(--white)" }}>
        {comment.comment_content}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="text"
          onClick={handleReplyClick}
          startIcon={<CommentIcon />}
          sx={{
            color: "var(--white)",
          }}
        >
          Reply ({comment?.comment_replies?.length || 0})
        </Button>
        {(userID === comment.comment_user.user_id || isAdmin) && (
          <IconButton onClick={() => onDeleteComment(comment._id)}>
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </Box>

      {replyVisible && (
        <Box sx={{ mt: 2 }}>
          {currentUser ? (
            <Box sx={{ display: "flex" }}>
              <TextField
                sx={{ flex: 1, marginRight: "16px" }}
                label="Write a reply..."
                variant="outlined"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                InputProps={{
                  sx: {
                    color: "var(--white)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--white)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--white)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--white)",
                    },
                    "&::placeholder": {
                      color: "var(--white)",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "var(--white)",
                    "&.Mui-focused": {
                      color: "var(--white)",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  color: "var(--green)",
                  fontSize: "12px",
                  backgroundColor: "var(--black)",
                  fontWeight: "600",
                  fontFamily: "var(--font-family)",
                  borderColor: "1px solid var(--green)",
                  "&:hover": {
                    color: "var(--green)",
                    backgroundColor: "var(--black)",
                    border: "1px solid var(--green)",
                  },
                }}
                onClick={handleReplySubmit}
              >
                Reply
              </Button>
            </Box>
          ) : (
            <h4 style={{ color: "var(--white)" }}>Please signin to reply</h4>
          )}

          <Box sx={{ mt: 2 }}>
            {comment.comment_replies?.length > 0 &&
              comment.comment_replies?.map((reply) => (
                <Box
                  key={reply._id}
                  sx={{ mb: 1, pl: 2, borderLeft: "1px solid var(--white)" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <img
                      src={reply.comment_user.user_avatar}
                      alt="avatar"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        marginRight: "8px",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "12px",
                          color: "var(--white)",
                        }}
                      >
                        {reply.comment_user.user_name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "var(--green)" }}
                      >
                        {timeFromNow(reply.createdAt)}
                      </Typography>
                    </Box>
                    {(userID === reply.comment_user.user_id || isAdmin) && (
                      <IconButton
                        onClick={() => onDeleteReply(reply._id)}
                        sx={{ ml: "auto" }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    )}
                  </Box>
                  <Typography sx={{ color: "var(--white)" }}>
                    <span style={{ color: "var(--green)" }}>
                      @{comment.comment_user.user_name}{" "}
                    </span>
                    {reply.comment_content}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const CommentsList = ({
  commentsData,
  onReplySubmit,
  onDeleteComment,
  onDeleteReply,
  mangaID,
}) => {
  return commentsData.map((comment) => (
    <CommentSection
      key={comment._id}
      comment={comment}
      onReplySubmit={onReplySubmit}
      onDeleteComment={onDeleteComment}
      onDeleteReply={onDeleteReply}
      mangaID={mangaID}
    />
  ));
};

function Comments({ mangaID = "quy-troll-manh-nhat-the-gioi" }) {
  const dispatch = useDispatch();
  const [commentsData, setCommentDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const userID = currentUser?.metadata.user._id;
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentUser);

  const fetchData = async () => {
    const comments = await getComments(mangaID, dispatch);
    setCommentDatas(comments.metadata);
  };

  useEffect(() => {
    socket.emit("join_room", mangaID);

    socket.on("receive_comment", (newComment) => {
      setCommentDatas((prevComments) => [...prevComments, newComment]);
      fetchData();
    });

    socket.on("reply_comment", (data) => {
      fetchData();
    });

    socket.on("change_comment", (data) => {
      fetchData();
    });

    return () => {
      socket.off("receive_comment");
    };
  }, [socket, commentsData]);

  useEffect(() => {
    fetchData();
  }, [mangaID]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      manga_id: mangaID,
      user_id: userID,
      content: newComment,
      parent_comment_id: null,
    };
    await socket.emit("send_comment", commentData);
    setNewComment("");
  };

  const handleReplyComment = async (parentID, replyText) => {
    const commentData = {
      manga_id: mangaID,
      user_id: userID,
      content: replyText,
      parent_comment_id: parentID,
    };
    await socket.emit("send_comment", commentData);
  };

  const handleDeleteComment = useCallback(
    async (commentID) => {
      setLoading(true); // Start loading
      const data = {
        manga_id: mangaID,
        comment_id: commentID,
      };
      await deleteComment(accessToken, userID, data, dispatch, axiosJWT);
      socket.emit("delete_comment", data);
      setLoading(false); // Stop loading
    },
    [dispatch]
  );

  const handleDeleteReply = async (replyID) => {
    setLoading(true); // Start loading
    const data = {
      manga_id: mangaID,
      comment_id: replyID,
    };
    await deleteComment(accessToken, userID, data, dispatch, axiosJWT);
    socket.emit("delete_comment", data);
    setLoading(false); // Stop loading
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ width: isMobile ? "88%" : "100%", mx: "auto" }}>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {currentUser ? (
        <Box sx={{ display: "flex", mb: 2 }}>
          <TextField
            fullWidth
            label="Add a comment..."
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              sx: {
                color: "var(--white)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--white)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--white)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--white)",
                },
                "&::placeholder": {
                  color: "var(--white)",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: "var(--white)",
                "&.Mui-focused": {
                  color: "var(--white)",
                },
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              marginLeft: 2,
              color: "var(--green)",
              fontSize: "12px",
              backgroundColor: "var(--black)",
              fontWeight: "600",
              fontFamily: "var(--font-family)",
              borderColor: "1px solid var(--green)",
              "&:hover": {
                color: "var(--green)",
                backgroundColor: "var(--black)",
                border: "1px solid var(--green)",
              },
            }}
            onClick={handleAddComment}
          >
            Post
          </Button>
        </Box>
      ) : (
        <h2 style={{ textAlign: "center", color: "var(--white)" }}>
          Please signin to comment
        </h2>
      )}

      <CommentsList
        commentsData={commentsData}
        onReplySubmit={handleReplyComment}
        onDeleteComment={handleDeleteComment}
        onDeleteReply={handleDeleteReply}
        mangaID={mangaID}
      />
    </Box>
  );
}

export default memo(Comments);
