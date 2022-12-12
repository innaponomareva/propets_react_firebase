import React, { useEffect, useState } from "react";
import styles from "../css/petForm.module.css";
import * as yup from "yup";
import { FaPaw } from "react-icons/fa";
import TextInput from "./controls/TextInput";
import Textarea from "./controls/Textarea";
import Dropdown from "./controls/Dropdown";
import Button from "./buttons/Button";
import PhotoUploadBox from "./PhotoUploadBox";
import { useFormik } from "formik";
import { Timestamp } from "firebase/firestore";
import { onFileChange_fb } from "../service/appService";

const values = {
  type: "",
  other: "",
  sex: "",
  height: "",
  breed: "",
  color: "",
  location: "",
  features: "",
  description: "",
  phone: "",
  email: "",
};

const phoneRegExp =
  /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const schema = yup.object().shape({
  type: yup.string().required("Required field"),
  other: yup.string().when("type", {
    is: "other",
    then: yup.string().required("Required field"),
  }),
  sex: yup.string().required("Required field"),
  height: yup.string().required("Required field"),
  breed: yup.string().required("Required field"),
  color: yup.string().required("Required field"),
  location: yup.string().max(15, "Text is too long").required("Required field"),
  features: yup.string().max(60, "Text is too long").required("Required field"),
  description: yup
    .string()
    .max(500, "Text is too long")
    .required("Required field"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required field"),
  email: yup.string().required("Required field"),
});

const PetForm = ({ user, type, addAnimal, submitSuccess }) => {
  const [isOther, setIsOther] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileNameInStorage, setfileNameInStorage] = useState(null);

  const formik = useFormik({
    initialValues:
      type === "lost" ? { nickname: "", ...values } : { ...values },
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      await addAnimal({
        ...values,
        photo: fileUrl,
        uid: user.uid,
        postId: "img_" + Timestamp.now().seconds,
        created: Timestamp.now().seconds,
        fileNameInStorage,
      });
      actions.resetForm();
      setFileUrl("");
      actions.setSubmitting(false);
    },
    validationSchema: schema,
  });

  const onFileChange = async (event) => {
    try {
      const response = await onFileChange_fb(event, { directory: type });
      setFileUrl(response.fileUrl);
      setfileNameInStorage(response.fileNameInStorage);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (formik.values.type === "other") {
      setIsOther(true);
    } else {
      setIsOther(false);
    }
  }, [formik, isOther, setIsOther]);

  return (
    <>
      {submitSuccess && <p className="alert alert-success">Submit success!</p>}
      {!submitSuccess && (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.section_one}>
            <div className={styles.controls}>
              {type === "lost" && (
                <TextInput
                  type="text"
                  label="Nick:"
                  id="nickname"
                  name="nickname"
                  placeholder="Freddie"
                  value={formik.values.nickname}
                  onChange={formik.handleChange}
                  touched={formik.touched.nickname}
                  error={formik.errors.nickname}
                  onFocus={
                    formik.errors.nickname
                      ? () =>
                          formik.setTouched({
                            ...formik.touched,
                            nickname: false,
                          })
                      : null
                  }
                />
              )}

              <Dropdown
                label="Type:"
                name="type"
                options={["dog", "cat", "bird", "other"]}
                value={formik.values.type}
                onChange={formik.handleChange("type")}
                placeholder={"choose type"}
                error={formik.errors.type}
                touched={formik.touched.type}
                disabled={false}
              />

              {isOther && (
                <TextInput
                  type="text"
                  id="other"
                  name="other"
                  placeholder={"enter your type"}
                  value={formik.values.other}
                  onChange={formik.handleChange}
                  touched={formik.touched.other}
                  error={formik.errors.other}
                  onFocus={
                    formik.errors.other
                      ? () =>
                          formik.setTouched({
                            ...formik.touched,
                            other: false,
                          })
                      : null
                  }
                />
              )}

              <Dropdown
                label="Sex:"
                name="sex"
                options={["male", "female"]}
                value={formik.values.sex}
                onChange={formik.handleChange("sex")}
                placeholder={"choose sex"}
                error={formik.errors.sex}
                touched={formik.touched.sex}
                disabled={false}
              />

              <Dropdown
                label="Height:"
                name="height"
                options={[
                  "5–10 cm",
                  "10–15 cm",
                  "15–20 cm",
                  "20–40 cm",
                  "40–60 cm",
                  "60-80 cm",
                  "80–100 cm",
                ]}
                value={formik.values.height}
                onChange={formik.handleChange("height")}
                placeholder={"choose height"}
                error={formik.errors.height}
                touched={formik.touched.height}
                disabled={false}
              />

              <TextInput
                type="text"
                label="Breed:"
                id="breed"
                name="breed"
                placeholder="Golden Retriever"
                value={formik.values.breed}
                onChange={formik.handleChange}
                touched={formik.touched.breed}
                error={formik.errors.breed}
                onFocus={
                  formik.errors.breed
                    ? () =>
                        formik.setTouched({
                          ...formik.touched,
                          breed: false,
                        })
                    : null
                }
              />
              <TextInput
                type="text"
                label="Color:"
                id="color"
                name="color"
                placeholder="beige"
                value={formik.values.color}
                onChange={formik.handleChange}
                touched={formik.touched.color}
                error={formik.errors.color}
                onFocus={
                  formik.errors.color
                    ? () =>
                        formik.setTouched({
                          ...formik.touched,
                          color: false,
                        })
                    : null
                }
              />
              <TextInput
                type="text"
                label="Location:"
                id="location"
                name="location"
                placeholder="Oliver Platz, Berlin"
                value={formik.values.location}
                onChange={formik.handleChange}
                touched={formik.touched.location}
                error={formik.errors.location}
                onFocus={
                  formik.errors.location
                    ? () =>
                        formik.setTouched({
                          ...formik.touched,
                          location: false,
                        })
                    : null
                }
              />
            </div>
            <div className={styles.upload}>
              <PhotoUploadBox
                id={`photo_${type}`}
                name={`photo_${type}`}
                fileUrl={fileUrl}
                onFileChange={onFileChange}
              />
            </div>
          </div>
          <div className={styles.section_two}>
            <TextInput
              layout="column"
              label={"Distinktive features:"}
              helpText="up to 60 char"
              id="features"
              name="features"
              placeholder="blue collar with stars, no left ear, damaged tail."
              value={formik.values.features}
              onChange={formik.handleChange}
              touched={formik.touched.features}
              error={formik.errors.features}
              onFocus={
                formik.errors.features
                  ? () =>
                      formik.setTouched({
                        ...formik.touched,
                        features: false,
                      })
                  : null
              }
            />
            <Textarea
              label={"Description:"}
              helpText="up to 500 char"
              id="description"
              name="description"
              placeholder="some more information"
              value={formik.values.description}
              onChange={formik.handleChange}
              touched={formik.touched.description}
              error={formik.errors.description}
              onFocus={
                formik.errors.description
                  ? () =>
                      formik.setTouched({
                        ...formik.touched,
                        description: false,
                      })
                  : null
              }
            />
          </div>
          <div className={styles.section_three}>
            <TextInput
              type="email"
              label="Email:"
              id="email"
              name="email"
              placeholder="name@mail.com"
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
          <div className={styles.btn_section}>
            <Button
              type="button"
              label="Submit"
              icon={<FaPaw />}
              fillGreen
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default PetForm;
