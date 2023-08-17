import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Stack, Container, Typography } from "@mui/material";
import CartItems from "../components/cart/CartItems";
import CartSummary from "../components/cart/CartSummary";

const CartPage = () => {
  const { cart } = useContext(CartContext);

  const [editing, setEditing] = useState(false);

  const renderEmptyCartMessage = () => {
    return "Cart Empty";
  };

  const renderCart = () => {
    return (
      <Stack
        direction={{ xs: "column", md: "row" }}
        gap={10}
        justifyContent="center"
        alignItems={{ xs: "center", md: "flex-start" }}
        mt={10}
      >
        <CartItems editing={editing} setEditing={setEditing} />
        <CartSummary setEditing={setEditing} />
      </Stack>
    );
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" align="center">
        Your Shopping Cart
      </Typography>
      {cart?.total_unique_items > 0 ? renderCart() : renderEmptyCartMessage()}
    </Container>
  );
};

export default CartPage;
