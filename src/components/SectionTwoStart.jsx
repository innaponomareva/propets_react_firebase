import React from "react";
import styles from "./../css/sectionTwoStart.module.css";

const SectionTwoStart = () => (
  <section className={styles.section_two}>
    <div className={styles.img_box}>
      <img
        src="https://res.cloudinary.com/dt6qtzp2z/image/upload/v1619999558/propets/animals_group.jpg"
        alt="animals_group"
      />
    </div>
    <div className={styles.info_box}>
      <h4 className={styles.info_title}>
        Here is collected everything that your pet needs:
      </h4>
      <ul>
        <li>professional veterinarian tips;</li>
        <li>useful information about education and care;</li>
        <li>information about pet-sitting and walking service;</li>
        <li>
          and of course, great communication with new friends in your social
          network!
        </li>
      </ul>
    </div>
  </section>
);

export default SectionTwoStart;
