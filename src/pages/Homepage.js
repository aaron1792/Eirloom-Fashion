import { useState, useEffect } from "react";
import commerce from "../lib/commerce";
import { Container } from "@mui/material";
import Hero from "../components/home/Hero";
import Listing from "../components/home/Listing";
import Banner from "../components/home/Banner";
import SalesBanner from "../components/home/SalesBanner";
import NewsLetter from "../components/common/NewsLetter";

const NewArrivalsHeading = "New Arrivals";
const CustomerFavoritesHeading = " Customer Favorites";

const Homepage = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [customerFavorites, setCustomerFavorites] = useState([]);

  const fetchCategories = () => {
    commerce.categories
      .list()
      .then((categories) => {
        setNewArrivals(
          categories?.data?.filter((item) =>
            item.description.includes("New Arrivals")
          )
        );
        setCustomerFavorites(
          categories?.data?.filter((item) =>
            item.description.includes("Customer Favorites")
          )
        );
      })
      .catch((error) => {
        console.log("There was an error");
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container maxWidth="xl">
      <Hero />
      <Banner />
      <Listing heading={NewArrivalsHeading} data={newArrivals} />
      <SalesBanner />
      <Listing heading={CustomerFavoritesHeading} data={customerFavorites} />
      <NewsLetter />
    </Container>
  );
};

export default Homepage;
