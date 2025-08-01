import React, { useEffect, useState, useContext } from 'react';
import { Chrono } from 'react-chrono';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/education.css';

function Education({ header }) {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [width, setWidth] = useState('50vw');
  const [mode, setMode] = useState('VERTICAL_ALTERNATING');

  useEffect(() => {
    fetch(endpoints.education)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to load education data:', err);
        }
        setData(null);
      });

    const updateWidthAndMode = () => {
      const winWidth = window?.innerWidth;
      if (winWidth < 576) {
        setMode('VERTICAL');
        setWidth('90vw');
      } else if (winWidth >= 576 && winWidth < 768) {
        setWidth('90vw');
      } else if (winWidth >= 768 && winWidth < 1024) {
        setWidth('75vw');
      } else {
        setWidth('50vw');
      }
    };

    updateWidthAndMode();
    window.addEventListener('resize', updateWidthAndMode);
    return () => window.removeEventListener('resize', updateWidthAndMode);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <motion.div
          style={{ width }}
          className="section-content-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Container>
            <Chrono
              hideControls
              allowDynamicUpdate
              useReadMore={false}
              items={data.education}
              cardHeight={250}
              mode={mode}
              theme={{
                primary: theme?.accentColor,
                secondary: theme?.accentColor,
                cardBgColor: theme?.chronoTheme?.cardBgColor,
                cardForeColor: theme?.chronoTheme?.cardForeColor,
                titleColor: theme?.chronoTheme?.titleColor,
              }}
            />
          </Container>
        </motion.div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
