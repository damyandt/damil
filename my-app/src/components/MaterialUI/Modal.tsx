import {
  Modal,
  Box,
  Typography,
  ModalProps as MuiModalProps,
  Grow,
} from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";

interface CustomModalProps extends Pick<MuiModalProps, "open" | "onClose"> {
  title: string;
  width?: number | string;
  children: React.ReactNode;
  style?: "info" | "edit" | "create";
  titleIcon?: "info" | "edit" | "create";
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
          minHeight: "30em",
          justifyContent: "space-between",
          height: "-webkit-fill-available",
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
                py={10}
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
                  {titleIcon === "info" && (
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
                  )}
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

            <Box
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "-webkit-fill-available",
                gap: 3,
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
