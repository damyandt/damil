import { SerializedStyles } from "@emotion/react";
import {
  CollapseProps as MUICollapseProps,
  Collapse as MUICollapse,
} from "@mui/material";

const cssStyles = {
  fullHeight: {
    height: "100% !important",
    "& .MuiCollapse-wrapper": {
      height: "100%",
    },
  },
};

interface CollapseProps extends MUICollapseProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  fullHeight?: boolean;
}

const Collapse: React.FC<CollapseProps> = ({
  className,
  fullHeight,
  children,
  ...props
}) => {
  const styles = cssStyles;
  return (
    <MUICollapse className={className} css={[fullHeight && styles.fullHeight]} {...props}>
      {children}
    </MUICollapse>
  );
};

export default Collapse;
