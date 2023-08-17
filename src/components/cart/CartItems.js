import { useState, useContext } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Stack,
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  CircularProgress,
} from "@mui/material";

import { Link } from "react-router-dom";
import commerce from "../../lib/commerce";
import { CartContext } from "../../context/CartContext";

const CartItems = ({ editing, setEditing }) => {
  const { cart } = useContext(CartContext);
  const { setCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  const handleUpdateQuantity = async (lineItemId, quantity) => {
    const updateQty = async () => {
      const data = await commerce.cart.update(lineItemId, {
        quantity: quantity,
      });

      setCart(data.cart);
      setLoading(false);
    };
    setLoading(true);
    updateQty();
  };
  const handleDeleteItem = async (lineItemId) => {
    const deleteItem = async () => {
      const data = await commerce.cart.remove(lineItemId);
      setCart(data.cart);
      setEditing(false);
    };
    setEditing(true);
    deleteItem();
  };

  return (
    <Box width={{ xs: "80%", md: "50%" }}>
      <Typography variant="h4" pb={5} fontWeight={500}>
        Items
      </Typography>

      {editing ? (
        <CircularProgress size="25px" />
      ) : (
        cart?.line_items.map((items) => (
          <Card
            key={items.id}
            elevation={0}
            md={2}
            sx={{
              width: "100%",
              display: "flex",
              gap: 1,
              textDecoration: "none",
              color: "black",
              marginBottom: "10px",
            }}
          >
            <Box>
              <Link to={`../product/${items.product_id}`}>
                <CardMedia
                  component="img"
                  sx={{ width: 100 }}
                  image={items.image.url}
                  alt="cart"
                ></CardMedia>
              </Link>
            </Box>
            <Box ml={4}>
              <Stack spacing={2}>
                <Typography variant="h5">{items.product_name}</Typography>
                <Typography variant="subtitle2">
                  Price:{items.price.formatted_with_symbol}
                </Typography>
                <Typography variant="subtitle2">
                  {items.selected_options[0] ? (
                    <>
                      {" "}
                      {items.selected_options[0]?.group_name} :{" "}
                      {items.selected_options[0]?.option_name}{" "}
                    </>
                  ) : (
                    ""
                  )}
                </Typography>

                <Typography variant="subtitle2">
                  Quantity: {items.quantity}
                </Typography>
                <Stack direction="row" gap={2}>
                  <Button
                    m={10}
                    variant="outlined"
                    onClick={() =>
                      handleUpdateQuantity(items.id, items.quantity - 1)
                    }
                  >
                    <RemoveCircleIcon />
                  </Button>
                  <Typography variant="h5">
                    {!loading ? (
                      items.quantity
                    ) : (
                      <CircularProgress size="20px" />
                    )}
                  </Typography>
                  <Button
                    m={10}
                    variant="outlined"
                    onClick={() =>
                      handleUpdateQuantity(items.id, items.quantity + 1)
                    }
                  >
                    <AddCircleIcon />
                  </Button>
                </Stack>
                <Button
                  onClick={() => handleDeleteItem(items.id)}
                  variant="outlined"
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          </Card>
        ))
      )}
    </Box>
  );
};

export default CartItems;
