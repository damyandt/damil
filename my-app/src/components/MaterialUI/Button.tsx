import React from "react";
import {
  Button as MaterialButton,
  ButtonProps as MUIButtonProps,
} from "@mui/material";
import { SerializedStyles } from "@emotion/react";
import { Link } from "react-router-dom";
import { MAIN_COLOR } from "../../Layout/layoutVariables";

export interface ButtonProps extends MUIButtonProps {
  css?: (SerializedStyles | false)[] | SerializedStyles;
  className?: string;
  loading?: boolean;
  to?: string;
  external?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  onClick,
  disabled = false,
  variant = "outlined",
  color = "primary",
  className,
  size = "large",
  to,
  external = false,
  component,
  ...rest
}) => {
  if (!disabled && loading) disabled = true;

  let ComponentType: React.ElementType = component || "button";
  const componentProps: Record<string, any> = {};

  if (to) {
    if (external) {
      ComponentType = "a";
      componentProps.href = to;
      componentProps.target = "_blank";
      componentProps.rel = "noopener noreferrer";
    } else {
      ComponentType = Link;
      componentProps.to = to;
    }
  }

  return (
    <MaterialButton
      className={className}
      variant={variant}
      color={color}
      disabled={disabled}
      onClick={onClick}
      size={size}
      component={ComponentType}
      {...componentProps}
      {...rest}
      sx={{
        borderWidth: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
