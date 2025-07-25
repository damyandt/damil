import {
  Modal,
  Box,
  Typography,
  ModalProps as MuiModalProps,
  Grow,
  IconButton,
} from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { JSX } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface CustomModalProps extends Pick<MuiModalProps, "open" | "onClose"> {
  title: string;
  width?: number | string;
  children: React.ReactNode;
  style?: "info" | "edit" | "create";
  titleIcon?: "info" | "edit" | "create" | "search";
}

const sizeMap: any = {
  sm: "400px",
  md: "600px",
  lg: "800px",
};

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  width = 450,
  children,
  style,
  titleIcon,
}) => {
  const iconMap: Record<string, JSX.Element> = {
    info: <InfoOutlineIcon fontSize="large" color="action" />,
    create: <AddCircleOutlineOutlinedIcon fontSize="large" color="info" />,
    edit: <EditIcon fontSize="large" color="primary" />,
    search: <SearchIcon fontSize="large" color="action" />,
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="custom-modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: sizeMap[width] || width,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 10,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "space-between",
          maxHeight: "95vh",
          overflow: "scroll",
        }}
      >
        <Grow in={!!open} timeout={500}>
          <Box>
            <Box
              sx={
                style
                  ? {
                      backgroundImage:
                        style === "info"
                          ? `url("/black:white.jpg")`
                          : style === "edit"
                            ? `url("/purple.jpg")`
                            : `url("/blue.jpg")`,
                      backgroundSize: "cover",
                      backgroundRepeat: "repeat",
                      backgroundPosition: "center 27%",
                      borderRadius: 1,
                    }
                  : {}
              }
            >
              <Box
                component="div"
                textAlign="center"
                py={style ? 10 : 3}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingLeft: 3,
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    alignItems: "center",
                    border: "2px solid #fff",
                    paddingY: 1,
                    paddingX: 4,
                    height: "auto",
                    display: "flex",
                    borderRadius: 1,
                    gap: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                  }}
                >
                  {iconMap[titleIcon ?? ""]}
                  {/* {titleIcon === "info" && (
                    <InfoOutlineIcon fontSize="large" color="action" />
                  )}
                  {titleIcon === "create" && (
                    <AddCircleOutlineOutlinedIcon
                      fontSize="large"
                      color="info"
                    />
                  )}
                  {titleIcon === "edit" && (
                    <EditIcon fontSize="large" color="primary" />
                  )} */}
                  <Typography
                    variant="h4"
                    sx={{
                      color: "rgba(0, 0, 0, 0.75)",
                      fontWeight: 600,
                      letterSpacing: 0.5,
                      textTransform: "capitalize",
                      textShadow: "0 1px 2px rgba(255, 255, 255, 0.3)", // optional glow for contrast
                    }}
                  >
                    {title}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <IconButton
              onClick={() => {
                onClose && onClose({}, "escapeKeyDown");
              }}
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.2)",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.4)",
                },
              }}
              size="small"
            >
              <CloseIcon />
            </IconButton>
            <Box
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "-webkit-fill-available",
                gap: 3,
                width: "100%",
              }}
            >
              {children}
            </Box>
          </Box>
        </Grow>
      </Box>
    </Modal>
  );
};

export default CustomModal;
