import {
  AdminDataRegister,
  Business,
} from "../../../pages/usersPages/api/userTypes";

export const registerValidator = (
  step: number,
  business: Business,
  admin: AdminDataRegister,
  setErrors: any,
  t: any
): boolean => {
  const newErrors: { [key: string]: string } = {};
  if (step === 0) {
    if (!business.name?.trim())
      newErrors["name"] = t("Business name is required.");
    if (!business.businessEmail?.trim())
      newErrors["businessEmail"] = t("Business email is required.");
  }

  if (step === 1) {
    if (!business.city?.trim()) newErrors["city"] = t("City is required.");
    if (!business.address?.trim())
      newErrors["address"] = t("Address is required.");
  }

  if (step === 2) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!admin.email.trim()) {
      newErrors["email"] = t("Email is required.");
    } else if (!emailPattern.test(admin.email)) {
      newErrors["email"] = t("Invalid email format.");
    }

    if (admin.password.length < 8) {
      newErrors["password"] = t("Password must be at least 8 characters.");
    }

    if (!admin.confirmPassword) {
      newErrors["confirmPassword"] = t("Confirm password is required.");
    } else if (admin.confirmPassword !== admin.password) {
      newErrors["confirmPassword"] = t("Passwords do not match.");
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
