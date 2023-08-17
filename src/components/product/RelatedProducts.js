import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";

import { Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RelatedProducts = ({ product }) => {
  const relatedProducts = product?.[0]?.related_products;

  return (
    <>
      <Typography mb={2} variant="h5">
        Related Products
      </Typography>

      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        modules={[Pagination]}
        pagination={{ clickable: true }}
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
            slidesPerView: 4,
          },
        }}
      >
        {relatedProducts?.map((item) => (
          <SwiperSlide key={item?.id} style={{ flexGrow: 0 }}>
            <Card
              component={Link}
              to={`/product/${item.id}`}
              elevation={0}
              sx={{ textDecoration: "none", width: "300px" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={item.image.url}
                  alt="related products"
                  sx={{ borderRadius: 2, minHeight: "500px", max: "500px" }}
                />
                <CardContent>
                  <Typography color="secondary" variant="subtitle2">
                    {item.name}
                  </Typography>
                  <Typography color="secondary" variant="subtitle2">
                    {item.price.formatted_with_code}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default RelatedProducts;
