import React, { useEffect, useState, useContext } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';

function Experience({ header }) {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(endpoints.experiences)
      .then((res) => res.json())
      .then((res) => setData(res.experiences || []))
      .catch((err) => {
        console.error('Failed to load experiences:', err);
        setData([]);
      });
  }, []);

  if (!data.length) return <FallbackSpinner />;

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          <Timeline lineColor={theme?.timelineLineColor || '#ccc'}>
            {data.map((item) => (
              <TimelineItem
                key={item.id || item.title}
                dateText={item.dateText || ''}
                dateInnerStyle={{
                  background: theme?.accentColor || '#3B82F6',
                }}
                style={{ marginBottom: 10 }}
                bodyContainerStyle={{
                  color: theme?.color || '#333',
                }}
              >
                <h2 className="item-title text-lg font-bold mb-1">
                  {item.title}
                </h2>

                {item.subtitle && (
                  <div className="mb-2">
                    <h4
                      style={{ color: theme?.accentColor || '#3B82F6' }}
                      className="inline font-semibold"
                    >
                      {item.subtitle}
                    </h4>
                    {item.workType && (
                      <>
                        <span className="inline text-sm text-gray-600 ml-2">
                          ·
                        </span>
                        <span className="inline text-sm text-gray-600 ml-1">
                          {item.workType}
                        </span>
                      </>
                    )}
                  </div>
                )}

                <ul className="pl-5 list-disc space-y-2">
                  {(item.workDescription || []).map((point) => (
                    <li key={item.title + point.slice(0, 15)}>{point}</li>
                  ))}
                </ul>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </div>
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
