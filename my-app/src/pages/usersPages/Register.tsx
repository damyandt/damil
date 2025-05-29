import { Box, Grid, Stack, Typography } from "@mui/material";
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
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        const newErrors: Partial<Gym> = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (!value) newErrors[key as keyof Gym] = "Required";
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Registering:", formData);
            // Add your register API logic here
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Register Gym
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Phone"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                    <TextField
                        label="Address"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        fullWidth
                        error={!!errors.address}
                        helperText={errors.address}
                    />
                    <TextField
                        label="City"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        fullWidth
                        error={!!errors.city}
                        helperText={errors.city}
                    />
                    <Grid  >
                        <TextField
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </Grid>
                    <Button type="submit" >
                        Register
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default RegisterPage;

