import { Box, Container, Stack, Typography, Link } from "@mui/material";
import Facebook from "../../img/footer/facebook.png";
import Instagram from "../../img/footer/instagram.png";
import Twitter from "../../img/footer/twitter.png";
import Linkedin from "../../img/footer/linkedin.png";

const styles = {
  customBox: {
    width: "100%",
    height: "auto",
    backgroundColor: "#000",
    backgroundRepeat: "no-repeat , repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    marginTop: "5rem",
    paddingTop: "5rem",
    paddingBottom: "8rem",
  },
};

const Footer = () => {
  return (
    <Box style={styles.customBox}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={{ md: "space-between" }}
        >
          <Stack spacing={2}>
            <Typography color="white" variant="h3">
              Eirloom
            </Typography>
            <Typography color="grey" variant="subtitle2">
              Complete your style with awesome clothe from us.
            </Typography>
            <Box>
              <Link underline="none" href="htp://facebook.com">
                <img className="footer-icon" src={Facebook} alt="facebook" />
              </Link>
              <Link underline="none" href="htp://twitter.com">
                <img className="footer-icon" src={Twitter} alt="twitter" />
              </Link>
              <Link underline="none" href="htp://instagram.com">
                <img className="footer-icon" src={Instagram} alt="instagram" />
              </Link>
              <Link underline="none" href="htp://linkedin.com">
                <img className="footer-icon" src={Linkedin} alt="linkedin" />
              </Link>
            </Box>
          </Stack>
          <Stack direction={{ md: "row" }} spacing={5}>
            <Box>
              <Typography
                sx={{ textDecoration: "underline" }}
                variant="h6"
                color="white"
              >
                Company
              </Typography>
              <Typography color="grey" mb={1}>
                About
              </Typography>
              <Typography color="grey" mb={1}>
                Contact
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ textDecoration: "underline" }}
                variant="h6"
                color="white"
              >
                Quick Links
              </Typography>
              <Typography color="grey" mb={1}>
                Catalog
              </Typography>
              <Typography color="grey" mb={1}>
                Size Guide
              </Typography>
              <Typography color="grey" mb={1}>
                FAQs
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ textDecoration: "underline" }}
                variant="h6"
                color="white"
              >
                Legal
              </Typography>
              <Typography color="grey" mb={1}>
                Terms & Conditions
              </Typography>
              <Typography color="grey" mb={1}>
                Privacy Policy{" "}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
