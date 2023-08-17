import { Box, Stack, Typography } from "@mui/material";
import { LocalShipping, Approval, WorkspacePremium } from "@mui/icons-material";

const styles = {
  customBox: {
    width: "100%",
    backgroundColor: "#EBD36B",
    borderRadius: "10px",
    height: { xs: "20rem", md: "5rem" },
    marginTop: "2rem",
  },
};

const Banner = () => {
  return (
    <Box style={styles.customBox}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <LocalShipping />
          <Typography variant="h5" fontWeight={900}>
            Fast Delivery
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Approval />
          <Typography variant="h5" fontWeight={900}>
            Satisfaction Guaranteed
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <WorkspacePremium />
          <Typography variant="h5" fontWeight={900}>
            Quality Assurance
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Banner;
