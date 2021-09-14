import React from 'react';
import styles from '../../modules.css/sectionOneStart.module.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const SectionOneStart = () => (
  <section className={styles.section_one}>
      <Container>
        <Row className="flex-nowrap">
          <Col>Our fluffy space for lovers, admirers, dads and<br/> moms of our four-legged, winged, tailed guys.</Col>
        </Row>
      </Container>
    </section>
)

export default SectionOneStart ;