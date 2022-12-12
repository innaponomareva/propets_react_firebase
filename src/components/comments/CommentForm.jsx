import React, { useContext } from "react";
import styles from "./../../css/comments.module.css";
import { Formik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { PostContext } from "../../context/post/postContext";

const schema = yup.object().shape({
  text: yup
    .string()
    .max(1500, "Your comment is over 1500 characters")
    .required("Please provide some text"),
});

const CommentForm = ({ postId, user }) => {
  const { addComment } = useContext(PostContext);

  return (
    <>
      {user && (
        <Formik
          initialValues={{
            postId: postId,
            commentId: `c-${moment().format()}`,
            uid: user.uid,
            authorName: user.name,
            date: { day: moment().format("LL"), time: moment().format("LT") },
            text: "",
          }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            try {
              await addComment(values);
            } catch (error) {
              console.log(error);
            } finally {
              actions.setSubmitting(false);
              document.querySelector("textarea").value = "";
            }
          }}
          validationSchema={schema}
        >
          {({
            values,
            touched,
            errors,
            setTouched,
            handleChange,
            handleSubmit,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className={styles.comment_textarea_container}>
                  {touched.text && errors.text && (
                    <div className="error-text">{errors.text}</div>
                  )}
                  <textarea
                    name="text"
                    type="text"
                    placeholder="Type your comment"
                    value={values.comment}
                    onChange={handleChange}
                    onFocus={
                      errors.text ? () => setTouched({ text: false }) : null
                    }
                  />
                </div>

                <button
                  className={`${styles.link_btn} ${styles.add_comment_btn}`}
                  type="submit"
                  //disabled={!props.isValid || props.isSubmitting}
                >
                  add comment
                </button>
              </form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default CommentForm;
