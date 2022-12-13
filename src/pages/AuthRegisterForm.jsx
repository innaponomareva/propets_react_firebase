import React from "react";
import * as yup from "yup";
import AuthLayout from "../layouts/AuthLayout";
import AuthForm from "../components/AuthForm";

const schema = yup.object().shape({
  name: yup.string().required("Required field"),
  email: yup.string().required("Required field"),
  password: yup
    .string()
    .min(8, "Min 8 characters")
    .matches(/[a-zA-Z]/, "Please use latin letters")
    .matches(/(?=.*[A-Z])/, "At least one uppercase letter")
    .matches(/(?=.*[a-z])/, "At least one lowercase letter")
    .matches(/(?=.*[^a-zA-Z0-9-])/, "At least one special character")
    .matches(/(?=.*[0-9])/, "At least one number")
    .required("Required field"),
  confirm: yup
    .string()
    .required("Required field")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const AuthRegisterForm = () => {
  return (
    <AuthLayout>
      <AuthForm
        formType={"register"}
        values={{ name: "", email: "", password: "", confirm: "" }}
        schema={schema}
      />
    </AuthLayout>
  );
};

export default AuthRegisterForm;
