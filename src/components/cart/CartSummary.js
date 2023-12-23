import { Stack, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import commerce from "../../lib/commerce";
import { CartContext } from "../../context/CartContext";

const CartSummary = ({ setEditing }) => {
  const { cart } = useContext(CartContext);
  const { setCart } = useContext(CartContext);

  const handleEmptyCart = async () => {
    const emptyCart = async () => {
      const data = await commerce.cart.refresh();
      setCart(data.cart);
      setEditing(false);
    };
    setEditing(true);
    emptyCart();
  };

  return (
    <Box width={{ xs: "80%", md: "25%" }}>
      <Typography variant="h4" pb={5} fontWeight={500}>
        Summary
      </Typography>
      <Stack gap={2}>
        <Stack direction="row" gap={5}>
          <Typography variant="subtitle2"> Total Items:</Typography>
          <Typography variant="subtitle2"> {cart?.total_items}</Typography>
        </Stack>
        <Stack direction="row" gap={5}>
          <Typography variant="subtitle2">Subtotal:</Typography>
          <Typography variant="subtitle2">
            {cart?.subtotal?.formatted_with_symbol}
          </Typography>
        </Stack>
      </Stack>
      <Box mt={5}>
        <Button
          component={Link}
          to={`../checkout`}
          sx={{
            width: "100%",
            textDecoration: "none",
          }}
          variant="contained"
          mt={2}
        >
          Check Out
        </Button>
        <Box mt={2}>
          <Button component={Link} variant="outlined" onClick={handleEmptyCart}>
            Empty Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartSummary;
