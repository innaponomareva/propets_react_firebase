import React from "react";
import styles from "./../css/petProfile.module.css";
import { FaEnvelopeSquare, FaMapMarker, FaPhoneSquare } from "react-icons/fa";
import moment from "moment";

const PetProfile = ({ post, users }) => {
  const postAuthor = users.find((item) => item.uid === post.uid);
  return (
    <>
      <div className={styles.pet_profile}>
        <div className={styles.title}>
          Lost pet:
          <span className={styles.nick}>{post.nickname ?? post.type}</span>
          <span className={styles.map_icon}>
            <FaMapMarker />
          </span>
          <span className={styles.location}>{post.location}</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.content_wrapper}>
          <div className={styles.section_one}>
            <div className={styles.photo}>
              <img src={post.photo} alt="pet_img" />
            </div>

            <div>
              <div className={styles.breed}>{post.breed}</div>
              <div className={styles.date}>
                {moment(post.created * 1000).format("LL")}
              </div>
              <div className={styles.grey_divider}></div>
              <div className={styles.details}>
                <span className={styles.details_title}>Color:</span>
                {post.color}
              </div>
              <div className={styles.details}>
                <span className={styles.details_title}>Sex:</span>
                {post.sex}
              </div>
              <div className={styles.details}>
                <span className={styles.details_title}>Height:</span>
                {post.height}
              </div>
            </div>
          </div>
          <div className={styles.section_two}>
            <div className={styles.details}>
              <span className={styles.details_title}>
                Distinctive features:
              </span>
              {post.features}
            </div>

            <div className={styles.details}>
              <span className={styles.details_title}>Description:</span>
              {post.description}
            </div>
            <div className={styles.details}>
              <span className={styles.details_title}>Published by:</span>
              {postAuthor.name}
            </div>
            <div className={styles.details}>
              <span className={styles.details_title}>
                <FaPhoneSquare className={styles.details_icon} />
              </span>
              {post.phone}
            </div>
            <div className={styles.details}>
              <span className={styles.details_title}>
                <FaEnvelopeSquare className={styles.details_icon} />
              </span>
              {post.email}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetProfile;
