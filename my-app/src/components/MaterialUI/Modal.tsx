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
          borderRadius: 3,
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
                      borderRadius: 3,
                    }
                  : {}
              }
            >
              <Typography
                id="custom-modal-title"
                variant="h5"
                fontWeight="bold"
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
                    backgroundColor: "#fff",
                    border: "1px dotted #000",
                    paddingY: 1,
                    paddingX: 3,
                    height: "auto",
                    display: "flex",
                    borderRadius: 1,
                    gap: 2,
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
                  {title}
                </Box>
              </Typography>
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
