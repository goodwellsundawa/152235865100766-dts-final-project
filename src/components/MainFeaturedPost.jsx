import React from "react";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/swiperPost.css";
// import required modules
import { Autoplay, Navigation, Pagination } from "swiper";

function MainFeaturedPost(props) {
  const { posts } = props;

  return (
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
        {posts.map((post) => {
          return (
            <SwiperSlide key={post.id}>
              <Link
                href={`/detail/${post.id}`}
                underline="none"
                sx={{ color: "inherit" }}
              >
                <Stack spacing={1}>
                  <div>
                    <div className="title">{post.name}</div>
                  </div>
                  <div>
                    <img
                      src={post.background_image}
                      alt={post.name}
                      style={{ height: "60vh" }}
                    />
                  </div>
                </Stack>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default MainFeaturedPost;
