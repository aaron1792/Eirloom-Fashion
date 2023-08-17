import { Link } from "react-router-dom";
import {
  Box,
  Paper,
  Container,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import HeroBackground from "../../img/hero/Hero.jpg";
import HeroImage from "../../img/hero/HeroImage.png";
import Vector from "../../img/common/vector.png";

const styles = {
  customPaper: {
    width: "100%",
    height: "auto",
    backgroundImage: "url(" + HeroBackground + ")",
    backgroundRepeat: "no-repeat, repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    paddingTop: "1rem",
  },
};

const Hero = () => {
  return (
    <Paper style={styles.customPaper}>
      <Container maxWidth="xl">
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction={{ xs: "column-reverse", md: "row" }}
        >
          <Box p={5} sx={{ zindex: 2 }}>
            <Box className="hero-box-white">
              <Typography className="hero-text" variant="h2">
                LET'S
              </Typography>
            </Box>
            <Box className="hero-box-none">
              <Typography className="hero-text" variant="h2">
                EXPLORE
              </Typography>
            </Box>
            <Box className="hero-box-yellow">
              <Typography className="hero-text" variant="h2">
                UNIQUE
              </Typography>
            </Box>
            <Box className="hero-box-none">
              <Typography className="hero-text" variant="h2">
                CLOTHING
              </Typography>
            </Box>
            <Box pb={2} pt={2}>
              <Typography variant="subtitle2">
                Live For Influential and Innovative Fashion!
              </Typography>
            </Box>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ width: "70%", padding: 10 }}
                  src={Vector}
                  alt="hero vector"
                />
              </Box>
              <Button
                component={Link}
                to="../catalogue"
                variant="contained"
                color="secondary"
              >
                Shop Now
              </Button>
            </Stack>
          </Box>
          <Box
            sx={{
              zindex: 1,
              marginTop: "auto",
              width: { xs: "80%", sm: "50%", md: "50%", lg: "50%" },
              position: "relative",
              top: { xs: "3rem", md: "0" },
            }}
          >
            <img className="hero-img-large " src={HeroImage} alt="Hero" />
          </Box>
        </Stack>
      </Container>
    </Paper>
  );
};

export default Hero;
