import React, { useContext, useEffect, useState } from "react";
import styles from "../css/userProfile.module.css";
import { UserContext } from "../context/user/userContext";
import { useFormik } from "formik";
import * as yup from "yup";
import { onFileChange_fb } from "../service/appService";
import { FaPencilAlt, FaSave, FaPlus } from "react-icons/fa";
import Button from "./buttons/Button";
import TextInput from "./controls/TextInput";
import AvatarUploadCard from "./AvatarUploadCard";

const phoneRegExp =
  /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const schema = yup.object().shape({
  name: yup.string().required("Required field"),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

const UserForm = ({ user }) => {
  const { updateSuccess, updateUser, loading } = useContext(UserContext);
  const [fileUrl, setFileUrl] = useState("");
  const [fileNameInStorage, setFileNameInStorage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setFileUrl(user && user.avatar ? user.avatar : "");
    setFileNameInStorage(
      user && user.fileNameInStorage ? user.fileNameInStorage : ""
    );
  }, [user]);

  const onFileChange = async (event) => {
    try {
      const response = await onFileChange_fb(event, { directory: "users" });
      console.log("response ", response);
      setFileUrl(response.fileUrl);
      setFileNameInStorage(response.fileNameInStorage);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: user ? user.name : "",
      phone: user ? user.phone : "",
    },
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        await updateUser({
          ...values,
          uid: user.uid,
          avatar: fileUrl ? fileUrl : "",
          fileNameInStorage: fileNameInStorage ? fileNameInStorage : "",
        });
      } catch (error) {
        console.log(error);
      } finally {
        actions.setSubmitting(false);
      }

      actions.setSubmitting(false);
    },
    validationSchema: schema,
    enableReinitialize: true,
  });

  return (
    <>
      {user && (
        <form name={user.uid}>
          {updateSuccess && (
            <p className="alert alert-success">Update success!</p>
          )}
          <div className={styles.content}>
            <div className={styles.photo_box}>
              <AvatarUploadCard
                id="userAvatar"
                name="userAvatar"
                type={"owner"}
                uploadIcon={<FaPlus />}
                onChange={onFileChange}
                fileUrl={fileUrl}
              />
            </div>

            <div className={styles.controls}>
              <div className={styles.username_box}>
                <TextInput
                  type="text"
                  label="Name:"
                  id="name"
                  name="name"
                  placeholder="your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  disabled={isDisabled}
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
                <FaPencilAlt
                  className={styles.edit_img}
                  onClick={() => setIsDisabled(!isDisabled)}
                />
              </div>

              <TextInput
                type="tel"
                label="Phone:"
                id="phone"
                name="phone"
                placeholder="+49 000 00000000"
                value={formik.values.phone}
                onChange={formik.handleChange}
                touched={formik.touched.phone}
                error={formik.errors.phone}
                onFocus={
                  formik.errors.phone
                    ? () =>
                        formik.setTouched({
                          ...formik.touched,
                          phone: false,
                        })
                    : null
                }
              />
            </div>
          </div>
          <div className={styles.btn_container}>
            <Button
              type="submit"
              icon={<FaSave />}
              fillGreen
              onClick={formik.handleSubmit}
            />
          </div>
        </form>
      )}
      {!loading && !user && <p>User not found...</p>}
    </>
  );
};

export default UserForm;
