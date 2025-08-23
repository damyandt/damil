import {
  AdminDataRegister,
  BusinessDataRegister,
} from "../../../pages/usersPages/api/userTypes";

export const registerValidator = (
  step: number,
  business: BusinessDataRegister,
  admin: AdminDataRegister,
  setErrors: any
): boolean => {
  const newErrors: { [key: string]: string } = {};

  if (step === 0) {
    if (!business.name.trim()) newErrors["name"] = "Business name is required.";
    if (!business.businessEmail.trim())
      newErrors["businessEmail"] = "Business email is required.";
  }

  if (step === 1) {
    if (!business.city.trim()) newErrors["city"] = "City is required.";
    if (!business.address.trim()) newErrors["address"] = "Address is required.";
  }

  if (step === 2) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!admin.email.trim()) {
      newErrors["email"] = "Email is required.";
    } else if (!emailPattern.test(admin.email)) {
      newErrors["email"] = "Invalid email format.";
    }

    if (admin.password.length < 8) {
      newErrors["password"] = "Password must be at least 8 characters.";
    }

    if (!admin.confirmPassword) {
      newErrors["confirmPassword"] = "Confirm password is required.";
    } else if (admin.confirmPassword !== admin.password) {
      newErrors["confirmPassword"] = "Passwords do not match.";
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
