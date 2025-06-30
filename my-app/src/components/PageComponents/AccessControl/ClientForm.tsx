import { Box, Grid } from "@mui/material";
import { useState } from "react";

import Button from "../../MaterialUI/Button";
import TextField from "../../TextField";
import callApi from "../../../API/callApi";
import { postQueryAddClient } from "./postQueries";
import { useAuthedContext } from "../../../context/AuthContext";
interface ClientFormProps {
  onClose: () => void;
}
const ClientForm: React.FC<ClientFormProps> = ({ onClose }) => {
  const { setAuthedUser } = useAuthedContext();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
      setErrors({ ...errors, [field]: "" });
    };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.firstName) newErrors.firstName = "First Name is required.";
    if (!form.lastName) newErrors.lastName = "Last Name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    if (!form.phone) newErrors.phone = "Phone is required.";

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const responce = await callApi<any>({
        query: postQueryAddClient(form),
        auth: { setAuthedUser },
      });
      console.log(responce);
      // if (responce.success === false) {
      //   return setErrors({ email: errorMessages.invalidEmail });
      // }
    } catch (error) {
      console.error("Failed:", error);
      // setErrors({
      //   email: errorMessages.internalServerError,
      // });
    }

    console.log("Submitted:", form);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            label="First Name"
            value={form.firstName}
            onChange={handleChange("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Last Name"
            value={form.lastName}
            onChange={handleChange("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Email"
            value={form.email}
            onChange={handleChange("email")}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Phone"
            value={form.phone}
            onChange={handleChange("phone")}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
      >
        <Grid>
          <Button
            color="error"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button onClick={handleSubmit}>Save Client</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientForm;
