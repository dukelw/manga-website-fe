import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Typography, CardMedia } from "@mui/material";
import CONSTANT from "../../../constants";

function Slider() {
  const [currentManga, setCurrentManga] = useState([]);
  const { fallbackSlider } = CONSTANT;

  useEffect(() => {
    const fetchData = async () => {
      setCurrentManga(fallbackSlider.comics);
    };
    fetchData();
  }, []);

  return (
    <Carousel
      animation="slide"
      indicators={true}
      navButtonsAlwaysVisible={true}
      autoPlay={true}
      interval={3000}
      sx={{
        margin: "auto auto",
        width: "80vw",
      }}
    >
      {currentManga?.map((manga) => (
        <Box key={manga.id} sx={{ textAlign: "center", padding: 2 }}>
          <CardMedia
            component="img"
            image={manga.thumbnail}
            alt={manga.title}
            sx={{
              borderRadius: 2,
              width: "100%",
              height: "360px",
              objectFit: "cover",
            }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            {manga.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "gray",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 5,
              height: "6em",
            }}
          >
            {manga.short_description || "No description available"}
          </Typography>
        </Box>
      ))}
    </Carousel>
  );
}

export default Slider;
