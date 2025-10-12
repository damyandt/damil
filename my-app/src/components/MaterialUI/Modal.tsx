import {
  Modal,
  Box,
  Typography,
  ModalProps as MuiModalProps,
  Grow,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CustomModalProps extends Pick<MuiModalProps, "open" | "onClose"> {
  title: string;
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
}

const sizeMap: { [key: string]: any } = {
  sm: {
    width: { xs: "90%", sm: "400px" },
  },
  md: {
    width: { xs: "90%", sm: "500px", md: "600px" },
  },
  lg: {
    width: { xs: "90%", sm: "600px", md: "800px" },
  },
};

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  height,
  width = "md",
  children,
}) => {
  const theme = useTheme();
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
          width: "100%",
          maxWidth: sizeMap[width]?.width || sizeMap["md"]?.width,
          bgcolor: theme.palette.customColors?.sectionBackgroundColor,
          borderRadius: 1,
          boxShadow: theme.palette.customColors?.shodow,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "space-between",
          height: height ?? "auto",
          maxHeight: "90dvh",
          overflow: "scroll",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Grow in={!!open} timeout={500}>
          <Box>
            <Box
              component="div"
              textAlign="center"
              py={3}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: 3,
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="h4">{title}</Typography>
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
