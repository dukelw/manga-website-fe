import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  ListItemAvatar,
  ListItemText,
  createTheme,
  useMediaQuery,
  ListItem,
  List,
  Drawer,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Search from "../Search";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { Wrapper as PopperWrapper } from "../../../components/Popper";
import { createAxios } from "../../../createAxios";
import styles from "./Header.module.scss";
import io from "socket.io-client";
import classNames from "classnames/bind";
import { findUser, getNotifications, logout } from "../../../redux/apiRequest";

const cx = classNames.bind(styles);
const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNoti, setAnchorElNoti] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isNotiOpen = Boolean(anchorElNoti);
  const location = useLocation();
  const currentUser = useSelector((state) => state?.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const axiosJWT = createAxios(currentUser);

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const toggleSearch = (open) => (event) => {
    setSearchOpen(open);
  };

  const handleLogout = () => {
    logout(accessToken, userID, dispatch, navigate, axiosJWT);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotiOpen = (event) => {
    setAnchorElNoti(event.currentTarget);
  };

  const handleNotiClose = () => {
    setAnchorElNoti(null);
  };

  const linkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "var(--yellow)" : "inherit",
    fontWeight: location.pathname === path ? "bold" : "normal",
  });

  const [notifications, setNotifications] = useState([]);
  const [haveNotRead, setHaveNotRead] = useState(0); // Số lượng thông báo chưa đọc

  const fetchData = async () => {
    try {
      const notiData = await getNotifications(userID, dispatch);
      let count = 0;

      const userPromises = notiData.map(async (notification) => {
        if (!notification.isRead) {
          count += 1;
        }
        const senderData = await findUser(
          notification.notification_sender_id,
          dispatch
        );
        const receiverData = await findUser(
          notification.notification_receiver_id,
          dispatch
        );

        return {
          ...notification,
          senderData: senderData.metadata.user,
          receiverData: receiverData.metadata.user,
        };
      });

      const notificationsWithUserData = await Promise.all(userPromises);
      setNotifications(notificationsWithUserData);
      setHaveNotRead(count);
      console.log(notificationsWithUserData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNotificationClick = (mangaId) => {
    const manga = mangaId.split("_")[0];
    const chap = mangaId.split("_")[1];
    navigate(`/manga/${manga}/${chap}`);
    handleNotiClose();
  };

  useEffect(() => {
    fetchData();
    socket.emit("join_room", userID);

    socket.on("receive_notification", (data) => {
      fetchData();
    });

    return () => {
      socket.off("receive_notification");
    };
  }, [socket]);

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  return (
    <AppBar
      sx={{
        backgroundColor: "var(--black)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "100%",
      }}
      position="fixed"
    >
      <Toolbar sx={{ width: "var(--default-header-width)", maxWidth: "100%" }}>
        {/* Logo + Search bar */}
        {isMobile && (
          <IconButton
            sx={{ color: "var(--white)", paddingLeft: "20px" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box
          display="flex"
          flexGrow={1}
          alignItems="center"
          sx={{ justifyContent: isMobile ? "center" : "unset" }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ marginRight: "14px", fontFamily: "var(--font-family)" }}
          >
            <Link
              to="/"
              style={{
                color: "var(--yellow)",
                textDecoration: "none",
                fontWeight: "bold",
                paddingLeft: isMobile ? "20px" : isTablet ? "25px" : "0px",
              }}
            >
              LEWIS MANGA
            </Link>
          </Typography>
          {!isMobile && <Search />}
        </Box>

        {/* Navigation links */}
        <Box sx={{ display: isMobile ? "none" : "flex", mr: 3 }}>
          <Typography
            variant="body1"
            sx={{ mx: 2, fontFamily: "var(--font-family)" }}
          >
            <Link to="/" style={linkStyle("/")}>
              Home
            </Link>
          </Typography>
          <Typography
            variant="body1"
            sx={{ mx: 2, fontFamily: "var(--font-family)" }}
          >
            <Link to="/genres" style={linkStyle("/genres")}>
              Genres
            </Link>
          </Typography>
          <Typography
            variant="body1"
            sx={{ mx: 2, fontFamily: "var(--font-family)" }}
          >
            <Link to="/new" style={linkStyle("/new")}>
              New
            </Link>
          </Typography>
          <Typography
            variant="body1"
            sx={{ mx: 2, fontFamily: "var(--font-family)" }}
          >
            <Link to="/popular" style={linkStyle("/popular")}>
              Popular
            </Link>
          </Typography>
        </Box>

        {/* Notifications + Avatar */}
        <Box
          display="flex"
          alignItems="center"
          sx={{ paddingRight: isTablet ? "10px" : "0" }}
        >
          {currentUser && (
            <IconButton color="inherit" onClick={handleNotiOpen}>
              <Badge badgeContent={haveNotRead} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          )}
          {isMobile && (
            <IconButton
              sx={{ color: "var(--white)" }}
              onClick={toggleSearch(true)}
            >
              <SearchIcon />
            </IconButton>
          )}
          <Menu
            anchorEl={anchorElNoti}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={isNotiOpen}
            onClose={handleNotiClose}
            PaperProps={{
              style: {
                maxHeight: 400,
                width: "fit-content",
                backgroundColor: "var(--grey)",
              },
            }}
          >
            {notifications.length === 0 ? (
              <MenuItem>No notifications</MenuItem>
            ) : (
              notifications.map((notification) => (
                <MenuItem
                  key={notification._id}
                  onClick={() =>
                    handleNotificationClick(notification.notification_manga_id)
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      src={
                        notification.senderData.avatar || "/default-avatar.png"
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${notification.senderData.name} has commented`}
                    secondary={notification.notification_content}
                    primaryTypographyProps={{
                      sx: { color: "var(--green)" },
                    }}
                    secondaryTypographyProps={{
                      sx: {
                        color: notification.isRead
                          ? "var(--white)"
                          : "var(--green)",
                      },
                    }}
                  />
                </MenuItem>
              ))
            )}
          </Menu>
          <HeadlessTippy
            interactive
            visible={isMenuOpen}
            placement="bottom-end"
            render={(attrs) => (
              <div tabIndex={-1} {...attrs}>
                <PopperWrapper className={cx("actions-container")}>
                  {accessToken ? (
                    <>
                      <MenuItem
                        className={cx("actions")}
                        onClick={handleMenuClose}
                      >
                        <Link to={`/profile/${userID}`}>Profile</Link>
                      </MenuItem>
                      <MenuItem
                        className={cx("actions")}
                        onClick={handleMenuClose}
                      >
                        <Link to={`/account/${userID}`}>Account</Link>
                      </MenuItem>
                      <MenuItem
                        className={cx("actions")}
                        onClick={handleMenuClose}
                      >
                        <Link to={"/history"}>History</Link>
                      </MenuItem>
                      <MenuItem
                        className={cx("actions")}
                        onClick={handleMenuClose}
                      >
                        <Link to={"/favourite"}>Favourite</Link>
                      </MenuItem>
                      <MenuItem
                        className={cx("actions")}
                        onClick={() => {
                          handleMenuClose();
                          handleLogout();
                        }}
                      >
                        Signout
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem
                        className={cx("actions")}
                        onClick={handleMenuClose}
                      >
                        <Link to={"/signup"}>Signup</Link>
                      </MenuItem>
                      <MenuItem
                        className={cx("actions")}
                        onClick={handleMenuClose}
                      >
                        <Link to={"/signin"}>Signin</Link>
                      </MenuItem>
                    </>
                  )}
                </PopperWrapper>
              </div>
            )}
            onClickOutside={handleMenuClose}
          >
            <div className={cx("search")}>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <Avatar
                  src={
                    currentUser?.metadata.user.user_avatar ||
                    "/default-avatar.png"
                  }
                />
              </IconButton>
            </div>
          </HeadlessTippy>
          {/* Drawer */}
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box
              sx={{
                width: 250,
                backgroundColor: "var(--black)",
                height: "100%",
                color: "var(--white)",
              }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                <ListItem component={Link} to="/" style={linkStyle("/")}>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/genres"
                  style={linkStyle("/genres")}
                >
                  <ListItemText primary="Genres" />
                </ListItem>
                <ListItem component={Link} to="/new" style={linkStyle("/new")}>
                  <ListItemText primary="New" />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/popular"
                  style={linkStyle("/popular")}
                >
                  <ListItemText primary="Popular" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <Drawer
            anchor="top"
            open={searchOpen}
            onClose={toggleSearch(false)}
            sx={{
              "& .MuiDrawer-paper": {
                height: "50vh",
              },
            }}
          >
            <Box
              sx={{
                padding: "12px 0",
                backgroundColor: "var(--black)",
                height: "100%",
              }}
            >
              <Search />
            </Box>
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
