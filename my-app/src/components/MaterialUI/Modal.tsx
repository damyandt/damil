import {
  Modal,
  Backdrop,
  Box,
  Typography,
  ModalProps as MuiModalProps,
  Grow,
} from "@mui/material";

interface CustomModalProps extends Pick<MuiModalProps, "open" | "onClose"> {
  title: string;
  width?: number | string;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  width = 450,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="custom-modal-title"
      // slots={{ backdrop: Backdrop }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 10,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Grow in={!!open} timeout={500}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography
              id="custom-modal-title"
              variant="h5"
              fontWeight="bold"
              textAlign="center"
            >
              {title}
            </Typography>

            {children}
          </Box>
        </Grow>
      </Box>
    </Modal>
  );
};

export default CustomModal;
