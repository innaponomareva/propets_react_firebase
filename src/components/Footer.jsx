import React from "react";
import styles from "../css/footer.module.css";
import Logo from "./logos/Logo";

const Footer = () => (
  <footer className={styles.footer}>
    <Logo color="white" className={styles.logo} />
    <p className={styles.company_address}>
      1600 Amphitheatre Pkwy Mountain View, CA 94043, USA
    </p>
  </footer>
);

export default Footer;
