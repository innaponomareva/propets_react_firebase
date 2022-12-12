import React from "react";
import styles from "../css/avatarCard.module.css";
import { FaPaw, FaUserCircle } from "react-icons/fa";
import clsx from "clsx";
import FileInput from "./controls/FileInput";

// type --> 'owner' | 'pet'

const AvatarUploadCard = ({
  id,
  name,
  type,
  uploadIcon,
  onChange,
  fileUrl,
}) => (
  <div className={styles.avatar_card}>
    <div className={styles.avatar_card_img_box}>
      <div className={clsx(styles.avatar_card_img, styles.card_large)}>
        {fileUrl && (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${fileUrl})`,
              backgroundSize: "cover",
              backgroundPositionX: "center",
              backgroundPositionY: "center",
            }}
          ></div>
        )}
        {!fileUrl && type === "owner" && (
          <FaUserCircle
            className={clsx(styles.avatar_card_svg, styles.svg_large)}
          />
        )}
        {!fileUrl && type === "pet" && (
          <FaPaw className={clsx(styles.avatar_card_svg, styles.svg_large)} />
        )}
      </div>
      <div className={styles.upload_icon}>
        <FileInput
          color="grey"
          icon={uploadIcon}
          id={id}
          name={name}
          onChange={onChange}
          fileUrl={fileUrl}
        />
      </div>
    </div>
  </div>
);

export default AvatarUploadCard;
