import { Paper, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const DraggableContainer = styled(Paper)(() => ({
  position: "fixed",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "60px",
  maxHeight: "200px",
  minHeight: "60px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  backgroundColor: "rgba(135, 135, 135, 0.69)",
  borderRadius: "40px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  zIndex: 100000000,
  touchAction: "none",
  userSelect: "none",
}));

interface FloatingRightMenuProps {
  extraMenu?: React.ReactNode | null;
  onClick?: () => void;
}

const FloatingRightMenu: React.FC<FloatingRightMenuProps> = ({
  extraMenu,
  onClick,
}) => {
  // const theme = useTheme();
  const [position, setPosition] = useState({
    x: 10,
    y: window.innerHeight / 2,
  });
  const dragging = useRef(false);
  const startY = useRef(0);
  const moved = useRef(false);

  const isDesktop = window.innerWidth >= 768;

  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        ...prev,
        y: Math.min(prev.y, window.innerHeight - 100),
      }));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const elementHeight = 85;
      const halfHeight = elementHeight / 2;
      const minY = halfHeight;
      const maxY = window.innerHeight - halfHeight;

      const newY = Math.min(Math.max(e.clientY, minY), maxY);
      if (Math.abs(e.clientY - startY.current) > 5) moved.current = true;
      setPosition({ x: 10, y: newY });
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isDesktop && !(e.target as HTMLElement).closest(".drag-handle")) return;

    dragging.current = true;
    moved.current = false;
    startY.current = e.clientY;
    e.preventDefault();
  };

  const handleMouseUp = () => {
    if (!moved.current && onClick) onClick();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    moved.current = false;
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const clientY = e.touches[0].clientY;
    if (Math.abs(clientY - startY.current) > 5) moved.current = true;

    const elementHeight = 85;
    const halfHeight = elementHeight / 2;
    const minY = halfHeight;
    const maxY = window.innerHeight - halfHeight;
    const newY = Math.min(Math.max(clientY, minY), maxY);
    setPosition({ x: 10, y: newY });
  };

  const handleTouchEnd = () => {
    if (!moved.current && onClick) onClick();
  };

  return (
    <DraggableContainer
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      sx={{
        top: position.y,
        transform: "translateY(-50%)",
      }}
    >
      {/* Desktop Drag Handle */}
      {isDesktop && (
        <Box
          className="drag-handle"
          sx={{
            position: "absolute",
            left: -17,
            top: "50%",
            transform: "translateY(-50%)",
            width: 24,
            height: 36,
            bgcolor: "rgba(0,0,0,0.2)",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            zIndex: 10,
          }}
        >
          <DragIndicatorIcon fontSize="small" />
        </Box>
      )}

      {extraMenu}
    </DraggableContainer>
  );
};

export default FloatingRightMenu;
