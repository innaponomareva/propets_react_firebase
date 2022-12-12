import React from "react";
import styles from "../css/sectionTitle.module.css";

const SectionTitle = ({ title, children }) => (
  <div className={styles.section_title_container}>
    <h5 className={styles.section_title}>{title}</h5>
    <div className={styles.section_title_divider}></div>
    {children && (
      <div className={styles.section_subtitle_container}>{children}</div>
    )}
  </div>
);

export default SectionTitle;
