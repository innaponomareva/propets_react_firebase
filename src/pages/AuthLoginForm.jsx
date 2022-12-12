import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import AuthLayout from "../layouts/AuthLayout";
import AuthForm from "../components/AuthForm";
import { UserContext } from "../context/user/userContext";

const schema = yup.object().shape({
  email: yup.string().required("Required field"),
  password: yup.string().required("Required field"),
});

const AuthLoginForm = () => {
  const { login, authSuccess } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (authSuccess) history.push("/posts");
  }, [authSuccess, history]);

  return (
    <AuthLayout>
      <AuthForm
        formType={"login"}
        values={{ name: "", email: "", password: "" }}
        onAuthSubmit={login}
        schema={schema}
      />
    </AuthLayout>
  );
};

export default AuthLoginForm;
