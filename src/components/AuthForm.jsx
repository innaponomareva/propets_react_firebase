import React, { useContext, useEffect } from "react";
import { FaPaw } from "react-icons/fa";
import TextInput from "../components/controls/TextInput";
import Button from "../components/buttons/Button";
import { useFormik } from "formik";
import { UserContext } from "../context/user/userContext";
import { useHistory } from "react-router-dom";

const AuthForm = ({ formType, values, schema }) => {
  const { login, register, error, authSuccess, clearError } =
    useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (authSuccess) history.push("/posts");
  }, [authSuccess, history]);

  useEffect(() => {
    return () => {
      if (error) clearError();
    };
  }, [clearError, error]);

  const formik = useFormik({
    initialValues: {
      ...values,
    },
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      if (formType === "login") {
        await login({ ...values });
      }
      if (formType === "register") {
        await register({ ...values });
      }
      actions.setSubmitting(false);
    },
    validationSchema: schema,
  });

  return (
    <form>
      <div className="auth_form_item">
        {formType === "login" && <div className="error-text">{error}</div>}
        <div className="auth_controls">
          {formType === "register" && (
            <TextInput
              id="name"
              name="name"
              type="text"
              label="Name:"
              placeholder="your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              touched={formik.touched.name}
              error={formik.errors.name}
              onFocus={
                formik.errors.name
                  ? () =>
                      formik.setTouched({
                        ...formik.touched,
                        name: false,
                      })
                  : null
              }
            />
          )}
          <TextInput
            id="email"
            name="email"
            type="email"
            label="Email:"
            placeholder="type your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            touched={formik.touched.email}
            error={formik.errors.email}
            onFocus={
              formik.errors.email
                ? () =>
                    formik.setTouched({
                      ...formik.touched,
                      email: false,
                    })
                : null
            }
          />
          <TextInput
            id="password"
            name="password"
            type="password"
            label="Password:"
            placeholder="type your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            touched={formik.touched.password}
            error={formik.errors.password}
            onFocus={
              formik.errors.password
                ? () =>
                    formik.setTouched({
                      ...formik.touched,
                      password: false,
                    })
                : null
            }
          />
          {formType === "register" && (
            <>
              <TextInput
                id="confirm"
                name="confirm"
                type="password"
                label="Password:"
                placeholder="confirm your password"
                value={formik.values.confirm}
                onChange={formik.handleChange}
                touched={formik.touched.confirm}
                error={formik.errors.confirm}
                onFocus={
                  formik.errors.confirm
                    ? () =>
                        formik.setTouched({
                          ...formik.touched,
                          confirm: false,
                        })
                    : null
                }
              />
              <p className="help-text-small">
                Password must have at least 8 characters with at least one
                Capital letter, at least one lower case letter and at least one
                number or special character.
              </p>
            </>
          )}
        </div>
        {formType === "register" && <div className="error-text">{error}</div>}
      </div>

      <div className="auth_form_divider"></div>

      <div className="auth_form_item">
        <div>
          <p className="help-text">
            By clicking “Submit”, you agree to us processing your information in
            accordance with <span className="underline">these terms</span>.
          </p>
        </div>
        <div className="auth_btn_container">
          <Button path="/" label="Cancel" />

          <Button
            type="submit"
            label="Submit"
            icon={<FaPaw />}
            fillGreen
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
          />
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
