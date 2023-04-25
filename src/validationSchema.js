import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    team: Yup.string().required("Please select a team"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number")
      .required("Phone number is required"),
    password: Yup.string().min(7, "Password must be at least 7 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  export const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  export const resetPasswordSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
  })
