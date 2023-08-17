import { Link } from "react-router-dom";
import { Paper, Box, Stack, Typography, Button, Divider } from "@mui/material";
import SalesImg from "../../img/banner/sales.png";
import SalesBackground from "../../img/banner/sales-background.png";

const styles = {
  customPaper: {
    width: "100%",
    height: "auto",
    backgroundImage: "url(" + SalesBackground + ")",
    backgroundRepeat: "no-repeat, repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "10px",
  },
};

const SalesBanner = () => {
  return (
    <Paper style={styles.customPaper} elevation={0}>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction={{ xs: "column", md: "row" }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box
          sx={{
            width: { xs: "70%", sm: "50%", lg: "40%" },
            position: "relative",
            top: { xs: "3rem", md: 0 },
          }}
        >
          <img
            className="banner-img-large"
            style={{ borderRadius: "10px" }}
            src={SalesImg}
            alt="Sales"
          />
        </Box>
        <Stack spacing={1} m={{ xs: 0, md: "auto" }} p={2}>
          <Box className="banner-box-white">
            <Typography className="hero-text" variant="h2">
              PAYDAY
            </Typography>
          </Box>
          <Typography variant="h3" fontWeight={900}>
            SALE NOW
          </Typography>
          <Typography variant="subtitle" fontWeight={500}>
            Spend minimal £100 & get £30 off
          </Typography>
          <Typography mt={1} variant="subtitle2">
            Entire Month Flash Sale
          </Typography>
          <Typography mb={2} variant="subtitle2">
            Terms & Conditions Apply
          </Typography>

          <Box>
            <Button
              component={Link}
              to=".../catalogue"
              sx={{ width: { xs: "100%", md: "auto" } }}
              variant="contained"
              color="secondary"
            >
              {" "}
              Shop Now
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SalesBanner;
