import { Card, IconButton, Stack, Theme, Tooltip, Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import cssSpacingStyles from "../../Global/Styles/spacing";
import { SerializedStyles, css } from "@emotion/react";
import cssLayoutStyles from "../../Global/Styles/layout";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import cssComponentsStyles from "../../Global/Styles/components";

const cssStyles = (theme: Theme, maxHeight?: number) => ({
  cardWithScroll: css({
    overflowY: "scroll",
    maxHeight: maxHeight,
  }),
  cardWithHover: css({
    cursor: "pointer",
    "&:hover": css({
      boxShadow: theme.shadows[5],
    }),
    color: "inherit",
    textDecoration: "inherit",
  }),
});

interface ContentBoxProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  label?: string | React.ReactNode;
  children: React.ReactNode;
  maxHeight?: number;
  clickAction?: {
    buttonClick?: {
      handleClick: () => void;
      ariaLabel: string;
    };
    to?: string;
  };
  noGutters?: boolean;
  infoText?: string;
  info?: {
    text: string | React.ReactNode;
    icon?: React.ReactElement<SVGAElement, any>;
    disabled?: boolean;
  };
  modalContent?: React.ReactElement<any, any>;
  modalLabel?: string;
}

const ContentBox: React.FC<ContentBoxProps> = ({
  className,
  label,
  children,
  maxHeight,
  clickAction,
  noGutters,
  infoText,
  info,
  modalContent,
  modalLabel,
}) => {
  const theme = useTheme();
  const styles = {
    ...cssSpacingStyles(theme),
    ...cssLayoutStyles,
    ...cssStyles(theme, maxHeight),
    ...cssComponentsStyles(theme),
  };
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  const clickActionProps = clickAction?.buttonClick
    ? {
        onClick: clickAction.buttonClick.handleClick,
        "aria-label": clickAction.buttonClick.ariaLabel,
      }
    : clickAction?.to
    ? {
        component: Link,
        to: clickAction.to,
      }
    : {};

  return (
    <>
      <Card
        css={[
          !noGutters && styles.fullPadding2,
          styles.flexColumn,
          maxHeight && styles.cardWithScroll,
          clickAction && styles.cardWithHover,
        ]}
        className={className}
        {...clickActionProps}
      >
        <Stack spacing={2} direction="row" justifyContent="space-between">
          {typeof label === "string" ? (
            <Typography
              css={styles.labelBreak}
              variant="h3"
              sx={{
                color: theme.palette.customColors.greyText,
                paddingBottom: 2,
              }}
            >
              {label}
            </Typography>
          ) : (
            label
          )}

          <Stack direction="row" alignItems="center">
            {info ? (
              typeof info.text === "string" ? (
                <Typography component="p" variant="body1">
                  {info.text}
                </Typography>
              ) : (
                info.text
              )
            ) : null}

            {info || modalContent ? (
              <IconButton onClick={() => setOpenInfo(true)} disabled={info?.disabled}>
                {info && info.icon ? (
                  <Tooltip title={modalLabel}>{info.icon}</Tooltip>
                ) : (
                  <InfoOutlinedIcon css={styles.infoIcon} />
                )}
              </IconButton>
            ) : null}
          </Stack>
        </Stack>

        {children}
      </Card>

      {infoText || modalContent ? (
        <Modal
          open={openInfo}
          onClose={() => setOpenInfo(false)}
          fullWidth
          label={modalLabel ? modalLabel : "Information"}
        >
          {infoText ? <Typography variant="body1">{infoText}</Typography> : null}
          {modalContent ? <>{modalContent}</> : null}
        </Modal>
      ) : null}
    </>
  );
};

export default ContentBox;
