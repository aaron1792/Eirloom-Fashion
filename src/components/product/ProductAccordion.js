import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProductAccordion = () => {
  return (
    <Box width="100%">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Shipping & Handling</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Standard 3 - 5 Business Days</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Return Policy</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>We offer a 30 day return policy</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Sizing</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>True to size</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProductAccordion;
