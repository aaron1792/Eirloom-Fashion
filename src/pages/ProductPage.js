import { useState, useEffect } from "react";

import commerce from "../lib/commerce";

import { useParams } from "react-router-dom";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { renderLinearLoader } from "../components/helper/Loaders";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductAccordion from "../components/product/ProductAccordion";
import RelatedProducts from "../components/product/RelatedProducts";

//const commerce = lazy(() => import("../lib/commerce"));

const ProductPage = () => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await commerce.products.list();
      setProducts(products?.data?.filter((data) => data.id.includes(id)));
    };
    fetchProducts();
  }, [id]);

  useEffect(() => {
    if (product.length > 0) {
      setLoading(false);
    }
  }, [product]);

  return (
    <Container maxWidth="lg">
      <Stack
        gap={5}
        mb={10}
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "flex-start" }}
      >
        <Box width={{ xs: "100%", md: "50%" }}>
          {loading ? (
            renderLinearLoader()
          ) : (
            <ProductGallery product={product} />
          )}
        </Box>

        <Stack
          spacing={1}
          p={1}
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          <ProductInfo product={product} />
          <ProductAccordion />
        </Stack>
      </Stack>
      <RelatedProducts product={product} />
    </Container>
  );
};

export default ProductPage;
