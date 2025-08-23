// export const RegisterValidator = (
//   isVerificationCode: boolean,
//   formData: any,
//   verificationCode: string,
//   setErrors: any
// ) => {
//   const newErrors: { [key: string]: string } = {};
//   if (!isVerificationCode) {
//     const fields: string[] = ["username", "email", "password"];
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (formData.email && !emailPattern.test(formData.email)) {
//       newErrors["email"] = "Please enter a valid email address.";
//     }
//     fields.map((el: string) => {
//       if (
//         formData[el] === undefined ||
//         formData[el] === null ||
//         formData[el] === ""
//       ) {
//         newErrors[el] =
//           `${el.charAt(0).toUpperCase() + el.slice(1)} is Required`;
//       }
//     });

//     formData.password.length < 8 &&
//       (newErrors["password"] = "Password must be at least 8 characters.");
//     formData.confirmPassword.length === 0 &&
//       (newErrors["confirmPassword"] = "Confirm Password is Required");
//     formData.confirmPassword !== formData.password &&
//       (newErrors["confirmPassword"] = "Passwords do not match.");
//   } else {
//     verificationCode.length !== 6 &&
//       (newErrors["verificationCode"] = "Verification Code must be 6 digits.");
//   }

//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
// };
