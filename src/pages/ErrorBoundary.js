import { useRouteError } from "react-router-dom";
import { Stack, Box, Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import errorImg from "../img/common/error.jpg";

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Container maxWidth="lg">
      <Stack flexDirection={{ xs: "column", md: "row" }} pt={20}>
        <Box>
          <Typography variant="h1"> 404 </Typography>
          <Typography variant="h6">
            {" "}
            The Page you are looking for doesn't exist
          </Typography>
          <Button
            sx={{ backgroundColor: "black" }}
            component={Link}
            to={"/"}
            variant="contained"
          >
            {" "}
            Back to Homepage
          </Button>
          <Box>
            <img src={errorImg} alt="error" width={500} height={250} />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};
