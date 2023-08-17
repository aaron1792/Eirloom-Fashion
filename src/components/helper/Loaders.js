import { Box, LinearProgress } from "@mui/material";

export const renderLinearLoader = () => {
  return (
    <Box width="100%" p={5}>
      <LinearProgress color="secondary" />
    </Box>
  );
};
