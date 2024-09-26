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
} from "@mui/material";
import { Notifications } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Search from "../Search";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { Wrapper as PopperWrapper } from "../../../components/Popper";
import { createAxios } from "../../../createAxios";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { logout } from "../../../redux/apiRequest";

const cx = classNames.bind(styles);

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const location = useLocation();
  const currentUser = useSelector((state) => state?.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const axiosJWT = createAxios(currentUser);

  const handleLogout = () => {
    logout(accessToken, userID, dispatch, navigate, axiosJWT);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "account-menu";

  const linkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "var(--yellow)" : "inherit",
    fontWeight: location.pathname === path ? "bold" : "normal",
  });

  return (
    <AppBar
      sx={{
        paddingTop: "20px",
        backgroundColor: "var(--black)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      position="static"
    >
      <Toolbar sx={{ width: "var(--default-header-width)" }}>
        {/* Logo + Search bar */}
        <Box display="flex" flexGrow={1} alignItems="center">
          <Typography
            variant="h6"
            component="div"
            sx={{ mr: 2, fontFamily: "var(--font-family)" }}
          >
            <Link
              to="/"
              style={{
                color: "var(--yellow)",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              LEWIS MANGA
            </Link>
          </Typography>
          <Search />
        </Box>

        {/* Navigation links */}
        <Box display="flex" sx={{ mr: 3 }}>
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
        <Box display="flex" alignItems="center">
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <HeadlessTippy
            interactive
            visible={isMenuOpen}
            placement="bottom-end"
            render={(attrs) => (
              <div tabIndex={-1} {...attrs}>
                <PopperWrapper className={cx("actions-container")}>
                  {currentUser ? (
                    <>
                      <MenuItem
                        className={cx("actions")}
                        onClick={handleMenuClose}
                      >
                        Account
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
                        Save
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
