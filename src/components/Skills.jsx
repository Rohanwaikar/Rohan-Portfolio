import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

function SkillItem({ title, icon }) {
  return (
    <div className="flex flex-col items-center w-24">
      {icon ? (
        <img
          src={icon.startsWith('http') ? icon : `/${icon.replace(/^\/+/, '')}`}
          alt={title}
          className="object-contain mb-2"
          style={{ width: '40px', height: '40px' }}
        />
      ) : (
        <span className="text-3xl mb-2">{icon}</span>
      )}
      <p className="text-sm font-bold text-center ">
        {title}
      </p>
    </div>
  );
}

SkillItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

SkillItem.defaultProps = {
  icon: '',
};

function SkillSection({ title, items }) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-6">
        {title}
      </h3>
      <div className="flex flex-wrap gap-6 justify-center">
        {items.map((item) => (
          <SkillItem key={item.title} title={item.title} icon={item.icon} />
        ))}
      </div>
    </div>
  );
}

SkillSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
    }),
  ).isRequired,
};

function Skills({ header }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((res) => setData(res))
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch skills:', err);
        }
        setError(err);
      });
  }, []);

  if (error) {
    return (
      <>
        <Header title={header} />
        <div className="max-w-6xl mx-auto px-4 my-10">
          <div className="text-red-600 text-center text-lg">
            Failed to load skills data.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title={header} />
      {data ? (
        <motion.div
          className="section-content-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-base sm:text-lg  mb-6 whitespace-pre-wrap">
              <ReactMarkdown>{data.intro}</ReactMarkdown>
            </div>

            {data.skills?.map((section) => (
              <SkillSection
                key={section.title}
                title={section.title}
                items={section.items}
              />
            ))}
          </div>
        </motion.div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
