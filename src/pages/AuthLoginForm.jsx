import React from "react";
import * as yup from "yup";
import AuthLayout from "../layouts/AuthLayout";
import AuthForm from "../components/AuthForm";

const schema = yup.object().shape({
  email: yup.string().required("Required field"),
  password: yup.string().required("Required field"),
});

const AuthLoginForm = () => {
  return (
    <AuthLayout>
      <AuthForm
        formType={"login"}
        values={{ name: "", email: "", password: "" }}
        schema={schema}
      />
    </AuthLayout>
  );
};

export default AuthLoginForm;
