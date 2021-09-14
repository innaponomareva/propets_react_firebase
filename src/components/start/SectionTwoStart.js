import React from 'react';
import styles from './../../modules.css/sectionTwoStart.module.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import AnimalsGroup from './../../images/animals_group.jpg';
import { NavLink } from 'react-router-dom';

const SectionTwoStart = () => (
  <section className={styles.section_two}>
      <Container fluid>
        <Row className="justify-content-between flex-wrap">
          <Col xl={5} sm={12} className={styles.img_box}><img src={AnimalsGroup} alt="animals_group" /></Col>
          <Col xl={7} sm={12} className={styles.info}>
            <h4 className={styles.info_title}>Here is collected everything that your pet needs:</h4>
            <ul>
              <li>professional veterinarian tips;</li>
              <li>useful information about education and care;</li>
              <li>information about pet-sitting and walking service;</li>
              <li>and of course, great communication with new friends in your social network!</li>
              <p className={styles.join_text}>Make an account and <NavLink to="/auth/register">join</NavLink> to us!</p>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
)

export default SectionTwoStart;