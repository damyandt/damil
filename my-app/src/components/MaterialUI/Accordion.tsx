import {
  AccordionDetails,
  AccordionSummary,
  Accordion as MUIAccordion,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SerializedStyles } from "@emotion/react";

interface AccordionProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  label: string | React.ReactNode;
  children: React.ReactNode;
  unmountOnExit?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  className,
  label,
  children,
  unmountOnExit,
}) => {
  return (
    <MUIAccordion
      className={className}
      TransitionProps={unmountOnExit ? { unmountOnExit: true } : undefined}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {typeof label === "string" ? (
          <Typography variant="h4">{label}</Typography>
        ) : (
          label
        )}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MUIAccordion>
  );
};

export default Accordion;
