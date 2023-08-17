import {
  Box,
  Stack,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Vector from "../../img/common/vector.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { renderLinearLoader } from "../helper/Loaders";

const Listing = ({ heading, data }) => {
  return (
    <Box pt={5} pb={5}>
      <Box sx={{ position: "relative" }}>
        <Typography
          className="listing-heading"
          variant="h5"
          fontWeight={900}
          mb={4}
        >
          {heading}
        </Typography>
        <img className="listing-vector" src={Vector} alt="vector" />
      </Box>
      <Stack
        direction="row"
        justifyContent={{ xs: "center", md: "space-between" }}
        flexWrap="wrap"
        spacing={1}
      >
        {data.length === 0 ? (
          renderLinearLoader()
        ) : (
          <>
            <Box width="100%">
              <Swiper
                modules={[Pagination]}
                spaceBetween={10}
                slidesPerView={5}
                pagination={{ clickable: true }}
                style={{ height: "500px" }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  600: {
                    slidesPerView: 2,
                  },
                  900: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 5,
                  },
                }}
              >
                {data?.map((item) => {
                  return (
                    <SwiperSlide key={item?.id}>
                      <Card
                        component={Link}
                        to={`/category/${item.slug}`}
                        elevation={0}
                        sx={{
                          maxWidth: 490,
                          minWidth: 290,
                          textDecoration: "none",
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height={400}
                            width="100%"
                            image={item?.assets[0]?.url}
                            alt="Listing info"
                            sx={{ borderRadius: 5, objectFill: "fill" }}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="subtitle2"
                              component="div"
                              color="secondary"
                            >
                              {item?.name}
                            </Typography>
                            <Typography variant="subtitle" color="secondary">
                              Explore Now
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Listing;
