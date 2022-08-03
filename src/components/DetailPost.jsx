import React from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import LoadingPage from "./LoadingPage";
import { Interweave } from "interweave";
import {
  useDetailsGameQuery,
  useScreenshotsGameQuery,
} from "../services/reqApiRAWG";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/swiperPost.css";
// import required modules
import { Autoplay, Navigation, Pagination } from "swiper";

function DetailPost() {
  const params = useParams();

  const {
    data: dataDetailsGame,
    error: errorDetailsGame,
    isLoading: isLoadingDetailsGame,
    isUninitialized: isUninitializedDetailsGame,
  } = useDetailsGameQuery({ id: params.id });

  const {
    data: dataScreenshotsGame,
    error: errorScreenshotsGame,
    isLoading: isLoadingScreenshotsGame,
    isUninitialized: isUninitializedScreenshotsGame,
  } = useScreenshotsGameQuery({ id: params.id });

  return (
    <>
      <Container maxWidth="lg">
        <main>
          <Divider sx={{ margin: "1.5em 0em" }} />
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                "& .markdown": {
                  py: 3,
                },
              }}
            >
              <Box sx={{ marginLeft: "1.5em" }}>
                {errorDetailsGame ? (
                  <>Oh no, there was an error : dataDetailsGame</>
                ) : isUninitializedDetailsGame ? (
                  <>Oh no, it's Uninitialized : dataDetailsGame</>
                ) : isLoadingDetailsGame ? (
                  <LoadingPage />
                ) : dataDetailsGame ? (
                  <>
                    {console.log("dataDetailsGame :", dataDetailsGame)}
                    <>
                      <Stack spacing={2}>
                        <Typography variant="h4" gutterBottom>
                          {dataDetailsGame.name}
                        </Typography>
                        <CardMedia
                          component="img"
                          sx={{
                            width: "100vh",
                            heigt: "50vh",
                            display: { xs: "none", sm: "block" },
                            border: 2,
                            borderRadius: 2,
                          }}
                          image={dataDetailsGame.background_image}
                          alt={dataDetailsGame.name}
                        />
                        <Grid container spacing={1}>
                          <Typography
                            component="legend"
                            sx={{ marginRight: "1em" }}
                          >
                            Rating :{" "}
                          </Typography>
                          <Rating
                            name="Rating"
                            value={dataDetailsGame.rating}
                            precision={0.1}
                            readOnly
                          />
                        </Grid>
                        <Grid container spacing={1}>
                          <Typography
                            component="legend"
                            sx={{ marginRight: "1em" }}
                          >
                            Genres :{" "}
                          </Typography>
                          {dataDetailsGame.genres.map((genre) => (
                            <Card
                              key={genre.id}
                              sx={{
                                maxWidth: 100,
                                maxHeight: 150,
                                marginRight: "0.5em",
                              }}
                            >
                              <CardMedia
                                component="img"
                                height="70"
                                image={genre.image_background}
                                alt={genre.name}
                              />
                              <CardContent>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  align="center"
                                >
                                  {genre.name}
                                </Typography>
                              </CardContent>
                            </Card>
                          ))}
                        </Grid>
                        <Grid container spacing={1}>
                          <Typography
                            component="legend"
                            sx={{ marginRight: "1em" }}
                          >
                            Platforms :{" "}
                          </Typography>
                          {dataDetailsGame.platforms.map((platform) => (
                            <Chip
                              key={platform.platform.id}
                              label={platform.platform.name}
                              variant="outlined"
                              sx={{ marginRight: "0.15em" }}
                            />
                          ))}
                        </Grid>
                        <Interweave
                          content={
                            dataDetailsGame.description
                              ? dataDetailsGame.description
                              : dataDetailsGame.description_raw
                          }
                        />
                      </Stack>
                    </>
                  </>
                ) : null}
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ margin: "1.5em 0em" }} />
          {errorScreenshotsGame ? (
            <>Oh no, there was an error : dataScreenshotsGame</>
          ) : isUninitializedScreenshotsGame ? (
            <>Oh no, it's Uninitialized : dataScreenshotsGame</>
          ) : isLoadingScreenshotsGame ? (
            <LoadingPage />
          ) : dataScreenshotsGame ? (
            <>
              {console.log("dataScreenshotsGame :", dataScreenshotsGame)}
              {dataScreenshotsGame.count > 0 ? (
                <>
                  <Swiper
                    spaceBetween={30}
                    loop={true}
                    navigation={true}
                    pagination={{
                      clickable: true,
                    }}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Navigation, Pagination]}
                    className="mySwiper"
                  >
                    {dataScreenshotsGame.results.map((post) => {
                      return (
                        <SwiperSlide key={post.id}>
                          <img
                            src={post.image}
                            alt=""
                            style={{ height: "60vh" }}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </>
              ) : null}
            </>
          ) : null}
          <Divider sx={{ margin: "1.5em 0em" }} />
        </main>
      </Container>
    </>
  );
}

export default DetailPost;
