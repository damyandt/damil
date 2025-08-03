import {
  Modal,
  Box,
  Typography,
  ModalProps as MuiModalProps,
  Grow,
  IconButton,
  useTheme,
} from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import { JSX } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface CustomModalProps extends Pick<MuiModalProps, "open" | "onClose"> {
  title: string;
  width?: number | string;
  children: React.ReactNode;
  style?: "info" | "edit" | "create";
  titleIcon?: "info" | "edit" | "create" | "search" | "login";
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
  const theme = useTheme();
  const iconMap: Record<string, JSX.Element> = {
    info: <InfoOutlineIcon fontSize="large" color="action" />,
    create: <AddCircleOutlineOutlinedIcon fontSize="large" color="info" />,
    edit: <EditIcon fontSize="large" color="primary" />,
    search: <SearchIcon fontSize="large" color="action" />,
    login: <LoginIcon fontSize="large" color="action" />,
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
          bgcolor: theme.palette.customColors?.sectionBackgroundColor,
          borderRadius: 1,
          boxShadow: theme.palette.customColors?.shodow,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "space-between",
          maxHeight: "95vh",
          overflow: "scroll",
          scrollbarWidth: "none", // for Firefox
          "&::-webkit-scrollbar": {
            display: "none", // for Chrome, Safari, and Edge
          },         
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
                        ? `url("/details.jpg")`
                        : style === "edit"
                          ? `url("/edit.jpg")`
                          : `url("/create.jpg")`,
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
                  sx={
                    style
                      ? {
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
                      }
                      : {
                        alignItems: "center",
                        paddingY: 1,
                        paddingX: 4,
                        height: "auto",
                        display: "flex",
                        // color: theme.palette.primary.main,
                        gap: 2,
                      }
                  }
                >
                  {iconMap[titleIcon ?? ""]}

                  <Typography
                    variant="h4"
                    sx={
                      style
                        ? {
                          color: "rgba(0, 0, 0, 0.75)",
                          fontWeight: 600,
                          letterSpacing: 0.5,
                          textTransform: "capitalize",
                          textShadow: "0 1px 2px rgba(255, 255, 255, 0.3)", // optional glow for contrast
                        }
                        : {}
                    }
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
