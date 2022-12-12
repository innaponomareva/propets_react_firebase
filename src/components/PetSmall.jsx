import React from "react";
import styles from "./../css/petSmall.module.css";
import { FaMapMarker } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const PetSmall = ({ type, pet }) => {
  return (
    <div className={styles.grid_item}>
      <div className={styles.content}>
        {type === "lost" && <p className={styles.pet_name}>{pet.nickname}</p>}
        {type === "found" && (
          <p className={styles.pet_name}>
            {pet.type === "other" && pet.other ? pet.other : pet.type}
          </p>
        )}

        <p className={styles.location}>
          <span>
            <FaMapMarker />
          </span>
          {pet.location}
        </p>
        <NavLink to={`/${type}/${pet.postId}`} className={styles.pet_photo_box}>
          <div
            className={styles.pet_photo}
            style={{
              backgroundImage: `url(${pet.photo})`,
              backgroundSize: "cover",
              backgroundPositionX: "center",
              backgroundPositionY: "center",
            }}
          ></div>
        </NavLink>
      </div>
    </div>
  );
};

export default PetSmall;
