import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  InputBase,
} from "@mui/material";
import { Search, Notifications } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const location = useLocation();

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
            <Link to="/" style={linkStyle("/")}>
              LEWIS MANGA
            </Link>
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "var(--dark)",
              borderRadius: 2,
              pl: 1,
              pr: 1,
              ml: 6,
              minWidth: "300px",
            }}
          >
            <Search sx={{ color: "#fff" }} />
            <InputBase
              placeholder="Search manga"
              inputProps={{ "aria-label": "search" }}
              sx={{ ml: 1, flex: 1, color: "#fff" }}
            />
          </Box>
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
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar />
          </IconButton>
        </Box>

        {/* Menu for Avatar */}
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Thông tin cá nhân</MenuItem>
          <MenuItem onClick={handleMenuClose}>Lịch sử đọc truyện</MenuItem>
          <MenuItem onClick={handleMenuClose}>Truyện đã lưu</MenuItem>
          <MenuItem onClick={handleMenuClose}>Đăng xuất</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
