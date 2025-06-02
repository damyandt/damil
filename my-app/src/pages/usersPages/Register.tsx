import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Gym } from "./userTypes";
import TextField from "../../components/TextField";
import Button from "../../components/MaterialUI/Button";

const RegisterPage = () => {
  const [formData, setFormData] = useState<Gym>({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Gym>>({});

  const handleChange = (field: keyof Gym, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => {
      if (!prev[field]) return prev;
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors: Partial<Gym> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors[key as keyof Gym] = "Required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!validateForm()) {
      console.warn("Form validation failed");
      e.preventDefault();

      return;
    }
    e.preventDefault();
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h4" mb={2}>
        Register Gym
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={0.1}>
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            fullWidth
            error={!!errors.email}
            helperText={errors.email || " "}
          />

          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            fullWidth
            error={!!errors.name}
            helperText={errors.name || " "}
          />

          <TextField
            label="Phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone || " "}
          />

          <TextField
            label="Address"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            fullWidth
            error={!!errors.address}
            helperText={errors.address || " "}
          />

          <TextField
            label="City"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            fullWidth
            error={!!errors.city}
            helperText={errors.city || " "}
          />

          <TextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            fullWidth
            error={!!errors.password}
            helperText={errors.password || " "}
          />

          <Button type="submit" fullWidth>
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegisterPage;
