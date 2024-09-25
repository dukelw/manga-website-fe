import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import classNames from "classnames/bind";
import styles from "./Signin.css";
import { signin } from "../../redux/apiRequest";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Divider, Typography } from "@mui/material";
import LoginWithFacebook from "../Auth/LoginWithFacebook";
import LoginWithGoogle from "../Auth/LoginWithGoogle";

const cx = classNames.bind(styles);

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email and password cannot be empty");
      setOpenSnackbar(true);
      return;
    }

    const user = { email, password };

    if (rememberMe) {
      Cookies.set("email", email, { expires: 7 });
      Cookies.set("password", password, { expires: 7 });
    } else {
      Cookies.remove("email");
      Cookies.remove("password");
    }

    const result = await signin(user, dispatch, navigate);
    if (result === false) {
      setErrorMessage(
        "Sign in failed. Please check your credentials and try again."
      );
      setOpenSnackbar(true); // Open snackbar if sign-in fails
    }
  };

  useEffect(() => {
    const savedEmail = Cookies.get("email");
    const savedPassword = Cookies.get("password");
    setRememberMe(!!savedEmail);
    setEmail(savedEmail || "");
    setPassword(savedPassword || "");
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <h1 style={{ color: "var(--white)" }}>SIGN IN</h1>
      <form onSubmit={handleSubmit} className={cx("form")}>
        <Box mb={2} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!email && openSnackbar}
            helperText={!email && openSnackbar ? "Email is required" : ""}
            sx={{
              input: { color: "var(--white)" },
              label: { color: "var(--white)" },
              "& .MuiInputLabel-root": {
                color: "var(--white)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--green)",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "var(--white)" },
                "&:hover fieldset": { borderColor: "var(--white)" },
                "&.Mui-focused fieldset": { borderColor: "var(--green)" },
              },
            }}
          />
        </Box>
        <Box mb={2} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!password && openSnackbar}
            helperText={!password && openSnackbar ? "Password is required" : ""}
            sx={{
              input: { color: "var(--white)" },
              label: { color: "var(--white)" },
              "& .MuiInputLabel-root": {
                color: "var(--white)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--green)",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "var(--white)" },
                "&:hover fieldset": { borderColor: "var(--white)" },
                "&.Mui-focused fieldset": { borderColor: "var(--green)" },
              },
            }}
          />
        </Box>
        <Box mb={2} sx={{ width: "100%" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={{
                  color: "var(--green)",
                  "&.Mui-checked": {
                    color: "var(--green)",
                  },
                }}
              />
            }
            label="Remember me"
            sx={{ color: "var(--white)" }}
          />
          <Link
            className={cx("link")}
            to="/signup"
            style={{
              color: "var(--yellow)",
              textDecoration: "none",
              marginLeft: "8px",
            }}
          >
            Sign up
          </Link>
        </Box>
        <Box mb={2} sx={{ width: "100%" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "var(--green)",
              color: "var(--black)",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "var(--black)",
                color: "var(--green)",
                border: "2px solid var(--green)",
              },
            }}
          >
            Sign in
          </Button>
        </Box>
      </form>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          margin: "20px 0",
        }}
      >
        <Divider sx={{ flex: 1, borderColor: "var(--white)" }} />
        <Typography
          variant="body1"
          sx={{ color: "var(--white)", padding: "0 10px" }}
        >
          Or
        </Typography>
        <Divider sx={{ flex: 1, borderColor: "var(--white)" }} />
      </Box>

      <Box
        mb={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <LoginWithGoogle />
        <LoginWithFacebook />
      </Box>
      <Link
        className={cx("link")}
        to="/"
        style={{ color: "var(--yellow)", textDecoration: "none" }}
      >
        Go to HomePage
      </Link>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default Signin;
