import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';

const Projects = ({ header }) => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.projects)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch projects:', err);
        }
      });
  }, []);

  const numberOfItems = showMore && data ? data.length : 6;

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Container className="mb-6">
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
              {data.projects?.slice(0, numberOfItems).map((project) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </Row>

            {!showMore && (
              <div className="flex justify-center mt-6">
                <Button
                  variant={theme.bsSecondaryVariant}
                  onClick={() => setShowMore(true)}
                  className="mt-4"
                >
                  Show More
                </Button>
              </div>
            )}
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
