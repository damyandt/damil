import { Box, Grid } from "@mui/material";
import { useState } from "react";

import Button from "../../MaterialUI/Button";
import TextField from "../../TextField";

const ClientForm = () => {
  const [form, setForm] = useState({
    name: "",
    birthday: null,
    egn: "",
    last_visit: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
      setErrors({ ...errors, [field]: "" }); // Clear error on change
    };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Name is required.";
    if (!form.birthday) newErrors.birthday = "Birthday is required.";
    if (!form.egn || form.egn.length !== 10)
      newErrors.egn = "EGN must be 10 digits.";
    if (!form.last_visit) newErrors.last_visit = "Last visit date is required.";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Submitted:", form);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            label="Full Name"
            value={form.name}
            onChange={handleChange("name")}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Birthday"
            // type="date"
            value={form.birthday}
            onChange={handleChange("birthday")}
            error={!!errors.birthday}
            helperText={errors.birthday}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="EGN"
            // value={form.egn}
            onChange={handleChange("egn")}
            error={!!errors.egn}
            helperText={errors.egn}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Last Visit"
            // type="date"
            value={form.last_visit}
            onChange={handleChange("last_visit")}
            error={!!errors.last_visit}
            helperText={errors.last_visit}
          />
        </Grid>
      </Grid>
      <Button color="primary" onClick={handleSubmit} sx={{ m: "1em 0" }}>
        Save Client
      </Button>
    </Box>
  );
};

export default ClientForm;
