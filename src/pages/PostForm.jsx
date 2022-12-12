import React, { useContext, useEffect, useState } from "react";
import styles from "../css/postForm.module.css";
import { PostContext } from "../context/post/postContext";
import { Timestamp } from "firebase/firestore";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { FaPaw } from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import SectionTitle from "../components/SectionTitle";
import AvatarCard from "../components/AvatarCard";
import Textarea from "../components/controls/Textarea";
import TextInput from "../components/controls/TextInput";
import PhotoUploadBox from "../components/PhotoUploadBox";

import Button from "../components/buttons/Button";
import { cleanStorage_fb, onFileChange_fb } from "../service/appService";

const schema = yup.object().shape({
  title: yup
    .string()
    .max(100, "Your title is too long!")
    .required("Required field"),
  text: yup
    .string()
    .max(1500, "Your text is over 1500 characters!")
    .required("Required field"),
});

const PostForm = ({ user }) => {
  const { addPost, submitSuccess } = useContext(PostContext);
  const [fileUrl, setFileUrl] = useState("");
  const [fileNameInStorage, setfileNameInStorage] = useState("");

  useEffect(() => {
    if (submitSuccess) console.log("submitSuccess", submitSuccess);
  }, [submitSuccess]);

  useEffect(() => {
    return () => {
      cleanStorage_fb("posts");
    };
  }, []);

  const onFileChange = async (event) => {
    try {
      const response = await onFileChange_fb(event, { directory: "posts" });
      setFileUrl(response.fileUrl);
      setfileNameInStorage(response.fileNameInStorage);
    } catch (error) {
      console.log(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
    },
    onSubmit: async (values, actions) => {
      console.log("values", {
        ...values,
        uid: user.uid,
        postImg: fileUrl,
        fileNameInStorage,
        postId: "post_" + Timestamp.now().seconds,
        created: Timestamp.now().seconds,
        date: {
          day: moment().format("LL"),
          time: moment().format("LT"),
        },
        likes: [],
        comments: [],
        authorPhoto: user.avatar,
        authorName: user.name,
      });
      actions.setSubmitting(true);
      await addPost({
        ...values,
        uid: user.uid,
        postImg: fileUrl,
        fileNameInStorage,
        postId: "post_" + Timestamp.now().seconds,
        created: Timestamp.now().seconds,
        date: {
          day: moment().format("LL"),
          time: moment().format("LT"),
        },
        likes: [],
        comments: [],
        authorPhoto: user.avatar,
        authorName: user.name,
      });
      formik.resetForm();
      setFileUrl("");
      actions.setSubmitting(false);
    },
    validationSchema: schema,
  });

  return (
    <MainLayout>
      <SectionTitle
        title={"Your new post! Simply text, add photo and publish."}
      />
      <>
        {submitSuccess && (
          <p className="alert alert-success">Submit success!</p>
        )}
        {!submitSuccess && user && (
          <form className={styles.post_form} onSubmit={formik.handleSubmit}>
            <div className={styles.section_one}>
              <div className={styles.upload}>
                <PhotoUploadBox
                  id="postImg"
                  name="postImg"
                  fileUrl={fileUrl}
                  onFileChange={onFileChange}
                />
              </div>

              <div className={styles.controls}>
                <TextInput
                  layout={"column"}
                  type="text"
                  label="Title:"
                  helpText="up to 100 char"
                  id="title"
                  name="title"
                  placeholder="Post title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  touched={formik.touched.title}
                  error={formik.errors.title}
                  onFocus={
                    formik.errors.title
                      ? () =>
                          formik.setTouched({
                            ...formik.touched,
                            title: false,
                          })
                      : null
                  }
                />
                <Textarea
                  long
                  label={"Text:"}
                  helpText="up to 1500 char"
                  id="text"
                  name="text"
                  placeholder="Type your text"
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  touched={formik.touched.text}
                  error={formik.errors.text}
                  onFocus={
                    formik.errors.text
                      ? () =>
                          formik.setTouched({
                            ...formik.touched,
                            text: false,
                          })
                      : null
                  }
                />
              </div>
            </div>
            <div className={styles.section_two}>
              <AvatarCard type={"owner"} photo={user.avatar} name={user.name} />
              <Button
                type="submit"
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
    </MainLayout>
  );
};

export default PostForm;
