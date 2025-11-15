import { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid"; // for generating unique IDs
export type SnackbarMessage = {
  id: string;
  message: string;
  severity: "success" | "info" | "error";
};

interface SnackbarContextType {
  messages: SnackbarMessage[];
  setMessages: React.Dispatch<React.SetStateAction<SnackbarMessage[]>>;
  handleCloseMessage: (id: string) => void;
  addMessage: (
    message: string,
    severity?: "success" | "info" | "error"
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType>(
  {} as SnackbarContextType
);

interface SnackboxContextProps {
  children: ReactNode;
}

const SnackboxContext = ({ children }: SnackboxContextProps) => {
  const [messages, setMessages] = useState<SnackbarMessage[]>([]);

  const handleCloseMessage = (idToRemove: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== idToRemove)
    );
  };
  const addMessage = (
    message: string,
    severity: "success" | "info" | "error" = "info"
  ) => {
    const newMessage: SnackbarMessage = {
      id: uuidv4(),
      message,
      severity,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <SnackbarContext.Provider
      value={{ messages, setMessages, handleCloseMessage, addMessage }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackboxContext;

// Hook to use the snackbar context
export const useSnackbarContext = (): SnackbarContextType =>
  useContext(SnackbarContext);
