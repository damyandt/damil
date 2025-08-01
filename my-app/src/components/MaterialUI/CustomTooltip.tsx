import { Box, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import React from "react";
import { useCustomThemeProviderContext } from "../../context/ThemeContext";

interface CustomTooltipProps extends TooltipProps {
  children: React.ReactElement;
  mainColor?: string;
  width?: number | string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  title,
  mainColor,
  placement = "right",
  width,
  ...rest
}) => {
  const { primaryColor } = useCustomThemeProviderContext();

  const effectiveColor = mainColor || primaryColor;
  return (
    <Tooltip
      title={title}
      placement={placement}
      {...rest}
      componentsProps={{
        tooltip: {
          sx: {
            width: width ? width : "fit-content",
            bgcolor: effectiveColor,
            color: "#fff",
            fontSize: 13,
            borderRadius: 0.5,
            boxShadow: 10,
            px: 1.5,
            py: 0.5,
            [`& .${tooltipClasses.arrow}`]: {
              color: effectiveColor,
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
