import React from "react";
import styles from "../css/photoUploadBox.module.css";
import FileInput from "./controls/FileInput";

const PhotoUploadBox = ({ id, name, fileUrl, onFileChange }) => {
  return (
    <div className={styles.photo_box}>
      {fileUrl ? (
        <div
          className={styles.photo}
          style={{
            backgroundImage: `url(${fileUrl})`,
            backgroundSize: "cover",
            backgroundPositionX: "center",
            backgroundPositionY: "center",
          }}
        ></div>
      ) : (
        <div className={styles.photo_default}>
          <p>Photo</p>
        </div>
      )}
      <FileInput
        label="Upload a photo"
        id={id}
        name={name}
        onChange={onFileChange}
        fileUrl={fileUrl}
      />
    </div>
  );
};

export default PhotoUploadBox;
