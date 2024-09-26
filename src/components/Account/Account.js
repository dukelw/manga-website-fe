import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { changePassword } from "../../redux/apiRequest";
import { createAxios } from "../../createAxios";
import { useNavigate } from "react-router-dom";

function Account() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const email = currentUser?.metadata.user.user_email;
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }
    if (!formData.currentPassword) {
      setError("Current password is required");
      return;
    }
    const data = {
      email: formData.email,
      password: formData.currentPassword,
      new_password: formData.newPassword,
    };
    const result = await changePassword(
      accessToken,
      userID,
      data,
      dispatch,
      axiosJWT
    );

    if (result) {
      setSnackbarMessage("Password changed successfully!");
      setSnackbarSeverity("success");
    } else {
      setSnackbarMessage("Failed to change password. Please try again.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container sx={{ width: isMobile ? "82vw" : "100%" }} maxWidth="sm">
      <h1>Change Password</h1>
      <p>
        *Change password can not be done for Social account like Google or
        Facebook
      </p>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: "var(--black)",
          boxShadow: "0 0 5px 1px var(--green)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                InputProps={{
                  readOnly: true,
                  sx: {
                    color: "var(--green)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--green)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--green)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--green)",
                    },
                    "&::placeholder": {
                      color: "var(--green)",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "var(--green)",
                    "&.Mui-focused": {
                      color: "var(--green)",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                variant="outlined"
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowCurrentPassword}
                        edge="end"
                      >
                        {showCurrentPassword ? (
                          <VisibilityOff sx={{ color: "var(--green)" }} />
                        ) : (
                          <Visibility sx={{ color: "var(--green)" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    color: "var(--green)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--green)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--green)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--green)",
                    },
                    "&::placeholder": {
                      color: "var(--green)",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "var(--green)",
                    "&.Mui-focused": {
                      color: "var(--green)",
                    },
                  },
                }}
                error={!!error}
                helperText={error}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                variant="outlined"
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowNewPassword}
                        edge="end"
                      >
                        {showNewPassword ? (
                          <VisibilityOff sx={{ color: "var(--green)" }} />
                        ) : (
                          <Visibility sx={{ color: "var(--green)" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    color: "var(--green)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--green)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--green)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--green)",
                    },
                    "&::placeholder": {
                      color: "var(--green)",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "var(--green)",
                    "&.Mui-focused": {
                      color: "var(--green)",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                variant="outlined"
                type={showConfirmNewPassword ? "text" : "password"}
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmNewPassword}
                        edge="end"
                      >
                        {showConfirmNewPassword ? (
                          <VisibilityOff sx={{ color: "var(--green)" }} />
                        ) : (
                          <Visibility sx={{ color: "var(--green)" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    color: "var(--green)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--green)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--green)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--green)",
                    },
                    "&::placeholder": {
                      color: "var(--green)",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "var(--green)",
                    "&.Mui-focused": {
                      color: "var(--green)",
                    },
                  },
                }}
                error={!!error}
                helperText={error}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  marginTop: 2,
                  color: "var(--black)",
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
                Change Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Account;
