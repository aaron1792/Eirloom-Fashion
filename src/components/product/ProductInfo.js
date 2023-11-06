import { useState, useEffect, useContext } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  ToggleButton,
  CircularProgress,
  styled,
  ToggleButtonGroup,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import { useParams } from "react-router-dom";
import commerce from "../../lib/commerce";
import { CartContext } from "../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductInfo = ({ product }) => {
  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(0.5),
      border: 1,
      borderColor: "primary",
      borderWidth: 1,
      "&:.MuiToggleButton": {
        borderRadius: "10px",
      },
    },
  }));

  const { setCart } = useContext(CartContext);
  const productSubtitle = product?.[0]?.categories?.[0]?.name
    ? product?.[0]?.categories?.[0]?.name
    : "Product";
  const productName = product?.[0]?.name;
  const description = product?.[0]?.description?.replace(/<[^>]*>/g, "");
  const price = product?.[0]?.price?.formatted_with_symbol;
  const sizes = product?.[0]?.variant_groups?.[0]?.options
    ? product?.[0]?.variant_groups?.[0]?.options
    : "";

  const { id } = useParams();
  const productVariantId = product?.[0]?.variant_groups?.[0]?.id
    ? product?.[0]?.variant_groups?.[0]?.id
    : "";

  let [quantity, setQuantity] = useState(0);
  const [variantId, setVariantId] = useState("");
  const [aligment, setAligment] = useState("");
  const [disableBuy, setDisableBuy] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasVariant, setHasVariant] = useState(false);

  const handleDecreaseQuantity = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAligment = (event, value) => {
    setAligment(value);
    setVariantId(value);
    setHasVariant(!hasVariant);
  };

  useEffect(() => {
    if (sizes === " ") setHasVariant(true);
    if (quantity === 0 || !hasVariant) setDisableBuy(true);
    if (quantity > 0 && hasVariant) setDisableBuy(false);
    if (variantId != null && quantity > 0) setDisableBuy(false);
    if (variantId === null) setDisableBuy(true);
  }, [quantity, variantId, hasVariant, sizes]);

  let variant = {
    [`${productVariantId}`]: variantId,
  };

  const handleAddToCart = async () => {
    const addToCart = async () => {
      const addItem = await commerce.cart.add(
        id,
        quantity,
        sizes ? variant : null
      );

      setCart(addItem.cart);
      setLoading(false);
      toast.success(`${addItem.product_name} has been added to the cart`, {
        position: toast.POSITION.TOP_CENTER,
      });
    };
    const buttonChange = async () => {
      setQuantity(0);
      setAligment("");
      setLoading(true);
    };
    buttonChange();
    addToCart();
  };
  return (
    <Stack spacing={2} alignItems={{ xs: "center", md: "flex-start" }}>
      <Typography variant="subtitle2">{productSubtitle}</Typography>
      <Typography variant="h4" fontWeight={700}>
        {productName}
      </Typography>
      <Typography variant="h4" fontWeight={500}>
        {price}
      </Typography>
      <Typography variant="p">{description}</Typography>

      <StyledToggleButtonGroup
        color="primary"
        value={aligment}
        exclusive
        onChange={handleAligment}
      >
        {sizes
          ? sizes?.map((item) => (
              <ToggleButton
                key={item.id}
                sx={{
                  border: "1px solid grey !important ",
                  borderRadius: "25px !important",
                }}
                value={item.id}
              >
                {item.name}
              </ToggleButton>
            ))
          : ""}
      </StyledToggleButtonGroup>
      <Stack direction="row" gap={2}>
        <Button m={10} variant="outlined" onClick={handleDecreaseQuantity}>
          <RemoveCircleIcon />
        </Button>
        <Typography variant="h5">{quantity}</Typography>
        <Button m={10} variant="outlined" onClick={handleIncreaseQuantity}>
          <AddCircleIcon />
        </Button>
      </Stack>
      {loading ? (
        <Box m={2}>
          <CircularProgress />
        </Box>
      ) : (
        <Button
          disabled={disableBuy}
          color="secondary"
          variant="contained"
          onClick={handleAddToCart}
        >
          <ToastContainer />
          Add to Cart
        </Button>
      )}
    </Stack>
  );
};

export default ProductInfo;
