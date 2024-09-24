import React from "react";
import { Box, Typography, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "var(--black)",
        color: "var(--white)",
        padding: "20px",
        textAlign: "center",
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontFamily: "var(--font-family)",
        }}
        variant="h6"
        component="div"
        gutterBottom
      >
        Lewis Manga
      </Typography>
      <Typography
        sx={{
          fontFamily: "var(--font-family)",
        }}
        variant="body2"
        color="inherit"
      >
        © 2024 Lewis Manga. All rights reserved.
      </Typography>

      <Box sx={{ marginTop: 2, fontFamily: "var(--font-family)" }}>
        <Link
          href="/terms"
          color="inherit"
          sx={{ margin: "0 10px" }}
          className={cx("link")}
        >
          Terms of Service
        </Link>
        <Link
          href="/privacy"
          color="inherit"
          sx={{ margin: "0 10px" }}
          className={cx("link")}
        >
          Privacy Policy
        </Link>
        <Link
          href="/contact"
          color="inherit"
          sx={{ margin: "0 10px" }}
          className={cx("link")}
        >
          Contact Us
        </Link>
        <Link
          href="/about"
          color="inherit"
          sx={{ margin: "0 10px" }}
          className={cx("link")}
        >
          About Us
        </Link>
        <Link
          href="/faq"
          color="inherit"
          sx={{ margin: "0 10px" }}
          className={cx("link")}
        >
          FAQ
        </Link>
      </Box>

      <Typography
        variant="body2"
        color="inherit"
        sx={{ marginTop: 2, fontFamily: "var(--font-family)" }}
      >
        Follow Us:
      </Typography>
      <Box sx={{ marginTop: 1 }}>
        <Link
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ margin: "0 10px" }}
          className={cx("link")}
        >
          <FacebookIcon className={cx("link")} sx={{ color: "var(--white)" }} />
        </Link>
        <Link
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ margin: "0 10px" }}
          className={cx("link")}
        >
          <TwitterIcon className={cx("link")} sx={{ color: "var(--white)" }} />
        </Link>
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ margin: "0 10px" }}
          className={cx("link")}
        >
          <InstagramIcon
            className={cx("link")}
            sx={{ color: "var(--white)" }}
          />
        </Link>
        <Link
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ margin: "0 10px" }}
          className={cx("link")}
        >
          <YouTubeIcon className={cx("link")} sx={{ color: "var(--white)" }} />
        </Link>
      </Box>

      <Typography
        variant="body2"
        color="inherit"
        sx={{ marginTop: 2, fontFamily: "var(--font-family)" }}
      >
        Join our newsletter for updates:
      </Typography>
      <input
        type="email"
        placeholder="Enter your email"
        style={{
          marginTop: "10px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid var(--white)",
          color: "var(--white)",
          backgroundColor: "transparent",
          outline: "none",
          fontFamily: "var(--font-family)",
        }}
      />
      <button className={cx("submit-btn")}>Subscribe</button>
    </Box>
  );
}

export default Footer;
