import React, { useEffect, useState } from "react";
import {
  Avatar,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
  IconButton,
  Button,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import { findUser, updateUser, uploadImage } from "../../redux/apiRequest";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: "/path/to/avatar.jpg",
    phone: "",
    gender: "male",
    birthDay: "01",
    birthMonth: "01",
    birthYear: "2000",
    createdAt: "2024-01-01",
    totalTests: 0,
    highestScore: 0,
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setAvatarFile(file);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foundUser = await findUser(userID, dispatch);
        const infoUser = foundUser?.metadata.user;
        const birthDate = new Date(infoUser?.birthday || "2000-01-01");
        const day = birthDate.getDate().toString().padStart(2, "0");
        const month = (birthDate.getMonth() + 1).toString().padStart(2, "0");
        const year = birthDate.getFullYear().toString();

        setProfile({
          name: infoUser?.name || "",
          email: infoUser?.email || "",
          avatar: infoUser?.avatar || "/path/to/avatar.jpg",
          phone: infoUser?.phone || "",
          gender: infoUser?.gender || "Male",
          birthDay: day,
          birthMonth: month,
          birthYear: year,
          createdAt: new Date(
            infoUser?.createdAt || "2024-01-01"
          ).toLocaleDateString(),
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [userID, dispatch, currentUser]);

  const handleSaveClick = async () => {
    try {
      let avatar = "";
      const uploadedImage = await uploadImage(avatarFile, dispatch);

      if (uploadedImage) {
        avatar = uploadedImage.metadata.url;
      }
      const updatedProfile = {
        ...profile,
        birthday: new Date(
          `${profile.birthYear}-${profile.birthMonth}-${profile.birthDay}`
        ).toISOString(),
        avatar,
      };

      await updateUser(accessToken, userID, updatedProfile, dispatch, axiosJWT);
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container sx={{ width: isMobile ? "82vw" : "100%" }} maxWidth="md">
      <h1>Your Profile</h1>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: "var(--black)",
          boxShadow: "0 0 5px 1px var(--green)",
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid sx={{ textAlign: "center" }} item>
            <Avatar
              alt={profile.name}
              src={profile.avatar}
              sx={{ width: 100, height: 100 }}
            />
            {isEditing && (
              <Button
                variant="contained"
                component="label"
                sx={{
                  marginTop: 2,
                  color: "var(--black)",
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
                Change
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleAvatarChange}
                />
              </Button>
            )}
          </Grid>
          <Grid item>
            <IconButton
              onClick={handleEditClick}
              sx={{
                color: "var(--green)",
              }}
            >
              {isEditing ? (
                <SaveIcon onClick={handleSaveClick} />
              ) : (
                <EditIcon />
              )}
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
          {["name", "email", "phone", "gender"].map((field, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                variant="outlined"
                value={profile[field]}
                name={field}
                onChange={handleInputChange}
                InputProps={{
                  readOnly: !isEditing,
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
          ))}

          {/* BirthDay, BirthMonth, BirthYear in one row */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {["birthDay", "birthMonth", "birthYear"].map((field, index) => (
                <Grid item xs={4} key={index}>
                  <TextField
                    fullWidth
                    label={
                      field === "birthDay"
                        ? "Day"
                        : field === "birthMonth"
                        ? "Month"
                        : "Year"
                    }
                    variant="outlined"
                    value={profile[field]}
                    name={field}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: !isEditing,
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
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "var(--green)" }}
            >
              Day Join Our Site: {profile.createdAt}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Profile;
