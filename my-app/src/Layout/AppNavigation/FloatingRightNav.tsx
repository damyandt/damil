import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/system";

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
  //   backdropFilter: "blur(10px)",
  backgroundColor: "rgba(135, 135, 135, 0.69)",
  borderRadius: "40px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  zIndex: 2000,
  touchAction: "none",
  cursor: "grab",
  userSelect: "none",
}));

interface FloatingRightMenuProps {
  //   css?: SerializedStyles[] | SerializedStyles;
  extraMenu?: React.ReactNode | null;
}

const FloatingRightMenu: React.FC<FloatingRightMenuProps> = ({ extraMenu }) => {
  // export default function FloatingRightMenu({
  //   children,
  // }: {
  //   children: React.ReactNode;
  // }) {
  const [position, setPosition] = useState({
    x: 10,
    y: window.innerHeight / 2,
  });

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

  const handleDrag = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    // Clamp Y position so it stays within the window
    const elementHeight = 85; // or dynamically use a ref
    const halfHeight = elementHeight / 2;
    const minY = halfHeight;
    const maxY = window.innerHeight - halfHeight;

    const newY = Math.min(Math.max(clientY, minY), maxY);

    setPosition({ x: 10, y: newY });
  };

  return (
    <DraggableContainer
      onTouchMove={handleDrag}
      onMouseDown={(e) => e.currentTarget.requestPointerLock()}
      onMouseMove={(e) => {
        if (document.pointerLockElement) handleDrag(e);
      }}
      onMouseUp={() => document.exitPointerLock()}
      sx={{
        top: position.y,
        transform: "translateY(-50%)",
      }}
    >
      {extraMenu}
    </DraggableContainer>
  );
};

export default FloatingRightMenu;
