import React from 'react';
import styles from '../../modules.css/footers.module.css';
import Row from 'react-bootstrap/Row';
import Logo from '../../images/Logo_white.svg';
import Container from 'react-bootstrap/Container';

const FooterMain = () => (
    <footer className={styles.footer}>
      <Container fluid>
        <Row className="justify-content-between nowrap">
          <img className={styles.logo} src={Logo} alt="logo" />
          <p className={styles.company_address}>1600 Amphitheatre Pkwy<br/>Mountain View, CA 94043, USA</p>
        </Row>
      </Container>
    </footer>
)

export default FooterMain;