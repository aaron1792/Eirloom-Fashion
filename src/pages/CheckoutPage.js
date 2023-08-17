import { useEffect, useState, useContext } from "react";
import {
  Box,
  Stack,
  Container,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import commerce from "../lib/commerce";
import { CartContext } from "../context/CartContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);
  const { setCart } = useContext(CartContext);
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  const [checkoutToken, setCheckoutToken] = useState("");
  const [shippingCountries, setShippingCountries] = useState("");
  const [country, setCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [subdivision, setSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [loadingReceipt, setLoadingReceipt] = useState(false);

  useEffect(() => {
    if (cart.line_items) {
      const generateCheckoutToken = async () => {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      };
      generateCheckoutToken();
    }
  }, [cart]);

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
  };

  const countriesList = Object.entries(shippingCountries).map(
    ([code, name]) => ({ id: code, label: name })
  );

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
  };

  const subdivisionsList = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    subdivision = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      {
        country: country,
        stateProvince: subdivision,
      }
    );
    setShippingOptions(options);
  };
  useEffect(() => {
    if (checkoutToken?.id) {
      fetchShippingCountries(checkoutToken?.id);
    }
  }, [checkoutToken?.id]);

  const handleCountryChange = (value) => {
    setCountry(value);
  };

  useEffect(() => {
    if (country) {
      fetchSubdivisions(country);
    }
  }, [country]);

  useEffect(() => {
    if (subdivision) {
      fetchShippingOptions(checkoutToken?.id, country, subdivision);
    }
  }, [checkoutToken?.id, country, subdivision]);

  const onSubmit = async (data, elements, stripe) => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (data && stripe)
      try {
        const orderData = {
          line_items: checkoutToken.line_items,
          customer: {
            firstname: data.firstName,
            lastname: data.lastName,
            email: data.email,
          },
          shipping: {
            name: `${data.firstName} ${data.lastName}`,
            street: data.shippingStreet,
            town_city: data.shippingCity,
            county_state: data.shippingSubdivisions,
            postal_zip_code: data.shippingZip,
            country: data.shippingCountries,
          },
          billing: {
            name: `${data.firstName} ${data.lastName}`,
            street: data.shippingStreet,
            town_city: data.shippingCity,
            county_state: data.shippingSubdivisions,
            postal_zip_code: data.shippingZip,
            country: data.shippingCountries,
          },
          fulfillment: {
            shipping_method: data.shippingOptions,
          },
          payment: {
            gateway: "stripe",
            stripe: {
              payment_method_id: paymentMethod.id,
            },
          },
        };
        const order = await commerce.checkout.capture(
          checkoutToken.id,
          orderData
        );
        const newCart = await commerce.cart.refresh();

        setCart(newCart);

        window.sessionStorage.setItem("order_receipt", JSON.stringify(order));
        setLoadingReceipt(true);
        navigate("/confirmation");
      } catch (error) {
        if (error) setLoadingReceipt(false);
        alert(error.data.error.message);
        console.log(error);
      }
  };

  return (
    <Container maxWidth="xl">
      {!checkoutToken ? (
        <Stack
          mt={{ xs: 10, md: 20 }}
          mb={{ xs: 10, md: 20 }}
          margin="auto"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size="100px" />
        </Stack>
      ) : (
        <>
          <Elements stripe={stripePromise}>
            <ElementsConsumer>
              {({ elements, stripe }) => (
                <>
                  <Typography variant="h4" mb={4} align="center">
                    Checkout
                  </Typography>

                  <Box>
                    <Typography variant="subtitle2" mb={2}>
                      {" "}
                      Contact Information Required
                    </Typography>
                    <form
                      onSubmit={handleSubmit(async (data) =>
                        onSubmit(data, elements, stripe)
                      )}
                    >
                      <Stack gap={2}>
                        <input
                          required
                          {...register("firstName")}
                          placeholder="First name"
                        />
                        <input
                          required
                          {...register("lastName")}
                          placeholder="Last name"
                        />
                        <input
                          required
                          {...register("email")}
                          placeholder="Email"
                        />
                      </Stack>
                      <Stack
                        mt={2}
                        spacing={2}
                        direction={{ xs: "column", md: "row" }}
                      >
                        <Box width={{ xs: "100%", md: "50%" }}>
                          <Typography variant="subtitle2" mb={2}>
                            {" "}
                            Shipping Information Required
                          </Typography>
                          <Stack gap={2}>
                            <input
                              required
                              {...register("shippingStreet")}
                              placeholder="Street Address"
                            />
                            <input
                              required
                              {...register("shippingCity")}
                              placeholder="City"
                            />
                            <input
                              required
                              {...register("shippingZip")}
                              placeholder="Post Code"
                            />
                            <select
                              defaultValue=""
                              required
                              {...register("shippingCountries")}
                              onChange={(e) =>
                                handleCountryChange(e.target.value)
                              }
                            >
                              <option value="" disabled hidden>
                                Select Country
                              </option>
                              {countriesList?.reverse().map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                            <select
                              defaultValue=""
                              required
                              {...register("shippingSubdivisions")}
                              onChange={(e) => setSubdivision(e.target.value)}
                            >
                              <option value="" disabled hidden>
                                Select State / Province
                              </option>
                              {subdivisionsList?.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                            <select
                              defaultValue=""
                              required
                              {...register("shippingOptions")}
                            >
                              <option value="" disabled hidden>
                                Select Shipping Option
                              </option>
                              {shippingOptions.length === 0 ? (
                                <option value=""> Loading...</option>
                              ) : (
                                shippingOptions?.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.description} :
                                    {item.price.formatted_with_symbol}
                                  </option>
                                ))
                              )}
                            </select>
                          </Stack>
                        </Box>
                        <Box width={{ xs: "100%", md: "50%" }}>
                          <Typography variant="subtitle2" mb={2}>
                            Credit Card Information Required
                          </Typography>
                          <Stack gap={2}>
                            <>
                              <CardElement />
                              <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                onClick={() => setLoadingReceipt(true)}
                              >
                                <Typography variant="subtitle2">
                                  Pay
                                  {
                                    checkoutToken?.live?.subtotal
                                      .formatted_with_symbol
                                  }
                                </Typography>
                              </Button>
                              {loadingReceipt ? (
                                <Stack
                                  mt={{ xs: 10, md: 20 }}
                                  mb={{ xs: 10, md: 20 }}
                                  margin="auto"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <CircularProgress size="100px" />
                                </Stack>
                              ) : (
                                ""
                              )}
                            </>
                          </Stack>
                        </Box>
                      </Stack>
                    </form>
                  </Box>
                </>
              )}
            </ElementsConsumer>
          </Elements>
        </>
      )}
    </Container>
  );
};

export default CheckoutPage;
