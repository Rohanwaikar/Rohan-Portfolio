import React, { useEffect, useState, useContext } from 'react';
import { Chrono } from 'react-chrono';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';

function Experience({ header }) {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [width, setWidth] = useState('50vw');
  const [mode, setMode] = useState('VERTICAL_ALTERNATING');

  useEffect(() => {
    fetch(endpoints.experiences)
      .then((res) => res.json())
      .then((res) => setData(res.experiences || []))
      .catch((err) => {
        console.error('Failed to load experiences:', err);
        setData([]);
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

  // Format experience data for Chrono
  const items = data.map((item) => ({
    title: item.dateText || item.title,
    cardTitle: item.title,
    cardSubtitle: item.subtitle ? `${item.subtitle}${item.workType ? ' · ' + item.workType : ''}` : '',
    cardDetailedText: item.workDescription || [],
  }));

  return (
    <>
      <Header title={header} />
      {items.length ? (
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
              items={items}
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

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
