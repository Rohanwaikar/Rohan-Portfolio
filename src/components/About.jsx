import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  introImage: {
    maxWidth: '200px', // Adjust size here
    width: '100%',
    height: 'auto',
    borderRadius: '8px', // Optional: makes corners rounded
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch about data:', err);
        }
      });
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Row className="align-items-center">
                <Col md={6} style={styles.introTextContainer}>
                  <ReactMarkdown>{data.about}</ReactMarkdown>
                </Col>
                <Col md={5} style={styles.introImageContainer}>
                  <img
                    src={data?.imageSource}
                    alt="profile"
                    style={styles.introImage}
                  />
                </Col>
              </Row>
            </motion.div>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
