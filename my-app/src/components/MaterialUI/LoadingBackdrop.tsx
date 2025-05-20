import { Theme } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import useTheme from "@mui/material/styles/useTheme";

interface LoadingBackdropProps {
  loading: boolean;
}

const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({ loading }) => {
  const theme = useTheme();

  return (
    <div>
      <Backdrop
        sx={{
          color: theme.palette.primary.main,
          zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
          position: "absolute",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default LoadingBackdrop;
