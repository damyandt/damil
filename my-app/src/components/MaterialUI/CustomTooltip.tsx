import { Box, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import React from "react";
import { MAIN_COLOR } from "../../Layout/layoutVariables";

interface CustomTooltipProps extends TooltipProps {
  children: React.ReactElement;
  mainColor?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  title,
  mainColor = MAIN_COLOR,
  placement = "right",
  ...rest
}) => {
  return (
    <Tooltip
      title={title}
      placement={placement}
      {...rest}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: mainColor,
            color: "#fff",
            fontSize: 13,
            borderRadius: 0.5,
            boxShadow: 10,
            px: 1.5,
            py: 0.5,
            [`& .${tooltipClasses.arrow}`]: {
              color: mainColor,
            },
          },
        },
      }}
    >
      <Box component="div">{children}</Box>
    </Tooltip>
  );
};

export default CustomTooltip;
